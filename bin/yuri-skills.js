#!/usr/bin/env node

const fs = require("fs");
const https = require("https");
const os = require("os");
const path = require("path");

const GITHUB_REPO = "MSWinds/yuri-skills";
const DEFAULT_REF = "main";
const MARKER_FILE = ".yuri-skills.json";
const VALID_AGENTS = new Set(["all", "claude", "codex"]);
const VALID_SCOPES = new Set(["user", "project", "repo", "global", "local"]);
const SKILL_NAME_RE = /^[a-z0-9-]+$/;

function usage() {
  console.log(`yuri-skills

Usage:
  yuri-skills list [--ref main]
  yuri-skills install [skill...] [--agent claude|codex|all] [--scope user|project] [--ref main] [--dry-run]
  yuri-skills remove [skill...] [--agent claude|codex|all] [--scope user|project] [--dry-run]

Defaults:
  install all Yuri skills from GitHub
  remove all skills installed by yuri-skills
  --agent all
  --scope user
  --ref main

Examples:
  yuri-skills install
  yuri-skills install grill-me-harder --agent codex
  yuri-skills install --scope project --ref v0.1.0
  yuri-skills remove
  yuri-skills remove --agent claude --dry-run
`);
}

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const out = {
    command: argv[0],
    skills: [],
    agent: "all",
    scope: "user",
    ref: DEFAULT_REF,
    dryRun: false,
  };

  for (let i = 1; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--dry-run") {
      out.dryRun = true;
      continue;
    }

    if (arg === "--agent" || arg === "-a") {
      out.agent = argv[i + 1];
      i += 1;
      continue;
    }

    if (arg.startsWith("--agent=")) {
      out.agent = arg.slice("--agent=".length);
      continue;
    }

    if (arg === "--scope" || arg === "-s") {
      out.scope = argv[i + 1];
      i += 1;
      continue;
    }

    if (arg.startsWith("--scope=")) {
      out.scope = arg.slice("--scope=".length);
      continue;
    }

    if (arg === "--ref" || arg === "-r") {
      out.ref = argv[i + 1];
      i += 1;
      continue;
    }

    if (arg.startsWith("--ref=")) {
      out.ref = arg.slice("--ref=".length);
      continue;
    }

    if (arg.startsWith("-")) {
      fail(`unknown option: ${arg}`);
    }

    out.skills.push(arg);
  }

  if (!VALID_AGENTS.has(out.agent)) {
    fail(`--agent must be one of: all, claude, codex`);
  }

  if (!VALID_SCOPES.has(out.scope)) {
    fail(`--scope must be one of: user, project`);
  }

  if (out.scope === "global") {
    out.scope = "user";
  }

  if (out.scope === "repo" || out.scope === "local") {
    out.scope = "project";
  }

  if (!out.ref) {
    fail(`--ref requires a value`);
  }

  for (const name of out.skills) {
    if (!SKILL_NAME_RE.test(name)) {
      fail(`invalid skill name: ${name}`);
    }
  }

  return out;
}

function selectedAgents(agent) {
  if (agent === "all") {
    return ["claude", "codex"];
  }
  return [agent];
}

function targetRoot(agent, scope) {
  const base = scope === "user" ? os.homedir() : process.cwd();

  if (agent === "claude") {
    return path.join(base, ".claude", "skills");
  }

  return path.join(base, ".agents", "skills");
}

function request(url, parseJson = false) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          "Accept": "application/vnd.github+json",
          "User-Agent": "yuri-skills-installer",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
      (res) => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          res.resume();
          request(res.headers.location, parseJson).then(resolve, reject);
          return;
        }

        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          const body = Buffer.concat(chunks);
          if (res.statusCode < 200 || res.statusCode >= 300) {
            reject(new Error(`GitHub request failed (${res.statusCode}): ${body.toString("utf8")}`));
            return;
          }

          if (parseJson) {
            try {
              resolve(JSON.parse(body.toString("utf8")));
            } catch (error) {
              reject(error);
            }
            return;
          }

          resolve(body);
        });
      },
    );

    req.on("error", reject);
  });
}

function githubContents(apiPath, ref) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${apiPath}?ref=${encodeURIComponent(ref)}`;
  return request(url, true);
}

async function remoteSkillNames(ref) {
  const entries = await githubContents("skills", ref);
  if (!Array.isArray(entries)) {
    fail(`GitHub path is not a directory: skills`);
  }

  return entries
    .filter((entry) => entry.type === "dir" && SKILL_NAME_RE.test(entry.name))
    .map((entry) => entry.name)
    .sort();
}

async function selectedSkills(requested, ref) {
  const available = await remoteSkillNames(ref);
  if (requested.length === 0) {
    return available;
  }

  for (const name of requested) {
    if (!available.includes(name)) {
      fail(`unknown skill: ${name}. Available at ${GITHUB_REPO}@${ref}: ${available.join(", ")}`);
    }
  }

  return requested;
}

function frontmatterName(skillMdPath) {
  if (!fs.existsSync(skillMdPath)) {
    return null;
  }

  const text = fs.readFileSync(skillMdPath, "utf8");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    return null;
  }

  const nameLine = match[1]
    .split(/\r?\n/)
    .find((line) => line.trim().startsWith("name:"));

  if (!nameLine) {
    return null;
  }

  return nameLine.split(":").slice(1).join(":").trim().replace(/^["']|["']$/g, "");
}

function readMarker(targetDir) {
  const markerPath = path.join(targetDir, MARKER_FILE);
  if (!fs.existsSync(markerPath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(markerPath, "utf8"));
  } catch {
    return null;
  }
}

function writeMarker(targetDir, skillName, ref, agent, scope) {
  const marker = {
    installer: "yuri-skills",
    source: `github:${GITHUB_REPO}`,
    skill: skillName,
    ref,
    agent,
    scope,
    installedAt: new Date().toISOString(),
  };
  fs.writeFileSync(path.join(targetDir, MARKER_FILE), `${JSON.stringify(marker, null, 2)}\n`);
}

function isYuriSkillTarget(targetDir, skillName) {
  const marker = readMarker(targetDir);
  if (marker) {
    return marker.installer === "yuri-skills" && marker.skill === skillName;
  }

  return frontmatterName(path.join(targetDir, "SKILL.md")) === skillName;
}

function ensureSafeExistingTarget(targetDir, skillName) {
  if (!fs.existsSync(targetDir)) {
    return;
  }

  if (!isYuriSkillTarget(targetDir, skillName)) {
    fail(`refusing to overwrite ${targetDir}; it does not look like ${skillName} installed by yuri-skills`);
  }
}

async function downloadDirectory(apiPath, targetDir, ref) {
  const entries = await githubContents(apiPath, ref);
  if (!Array.isArray(entries)) {
    fail(`GitHub path is not a directory: ${apiPath}`);
  }

  fs.mkdirSync(targetDir, { recursive: true });

  for (const entry of entries) {
    const entryTarget = path.join(targetDir, entry.name);

    if (entry.type === "dir") {
      await downloadDirectory(entry.path, entryTarget, ref);
      continue;
    }

    if (entry.type === "file") {
      const content = await request(entry.download_url, false);
      fs.writeFileSync(entryTarget, content);
    }
  }
}

async function downloadSkill(skillName, ref) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `yuri-skills-${skillName}-`));
  try {
    const skillDir = path.join(tempDir, skillName);
    await downloadDirectory(`skills/${skillName}`, skillDir, ref);
    const actualName = frontmatterName(path.join(skillDir, "SKILL.md"));
    if (actualName !== skillName) {
      fail(`downloaded skill ${skillName} has mismatched SKILL.md name: ${actualName || "missing"}`);
    }
    return { tempDir, skillDir };
  } catch (error) {
    fs.rmSync(tempDir, { recursive: true, force: true });
    throw error;
  }
}

async function installSkill(skillName, root, options, agent) {
  const targetDir = path.join(root, skillName);
  ensureSafeExistingTarget(targetDir, skillName);

  if (options.dryRun) {
    console.log(`[dry-run] install ${skillName} from ${GITHUB_REPO}@${options.ref} -> ${targetDir}`);
    return;
  }

  const { tempDir, skillDir } = await downloadSkill(skillName, options.ref);
  try {
    fs.mkdirSync(root, { recursive: true });
    fs.rmSync(targetDir, { recursive: true, force: true });
    fs.cpSync(skillDir, targetDir, { recursive: true });
    writeMarker(targetDir, skillName, options.ref, agent, options.scope);
    console.log(`Installed ${skillName} -> ${targetDir}`);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

function installedYuriSkills(root) {
  if (!fs.existsSync(root)) {
    return [];
  }

  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => {
      const marker = readMarker(path.join(root, name));
      return marker && marker.installer === "yuri-skills" && marker.skill === name;
    })
    .sort();
}

function removeSkill(skillName, root, dryRun) {
  const targetDir = path.join(root, skillName);
  if (!fs.existsSync(targetDir)) {
    console.log(`Skipped ${skillName}; not installed at ${targetDir}`);
    return;
  }

  if (!isYuriSkillTarget(targetDir, skillName)) {
    fail(`refusing to remove ${targetDir}; it does not look like ${skillName} installed by yuri-skills`);
  }

  if (dryRun) {
    console.log(`[dry-run] remove ${targetDir}`);
    return;
  }

  fs.rmSync(targetDir, { recursive: true, force: true });
  console.log(`Removed ${targetDir}`);
}

async function listSkills(options) {
  for (const skill of await remoteSkillNames(options.ref)) {
    console.log(skill);
  }
}

async function install(options) {
  const skills = await selectedSkills(options.skills, options.ref);
  for (const agent of selectedAgents(options.agent)) {
    const root = targetRoot(agent, options.scope);
    for (const skill of skills) {
      await installSkill(skill, root, options, agent);
    }
  }
}

function remove(options) {
  for (const agent of selectedAgents(options.agent)) {
    const root = targetRoot(agent, options.scope);
    const skills = options.skills.length > 0 ? options.skills : installedYuriSkills(root);

    if (skills.length === 0) {
      console.log(`No yuri-skills installs found at ${root}`);
      continue;
    }

    for (const skill of skills) {
      removeSkill(skill, root, options.dryRun);
    }
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (!options.command || options.command === "--help" || options.command === "-h") {
    usage();
    return;
  }

  if (options.command === "list") {
    await listSkills(options);
    return;
  }

  if (options.command === "install") {
    await install(options);
    return;
  }

  if (options.command === "remove" || options.command === "uninstall") {
    remove(options);
    return;
  }

  fail(`unknown command: ${options.command}`);
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});
