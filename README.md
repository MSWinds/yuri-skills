# yuri-skills

A curated collection of Agent Skills for AI workflows, engineering, research, and productivity.

Each skill is a self-contained folder under `skills/`. Pre-packaged `.skill` files for one-click install live in `dist/`.

Skills may be authored in English or Chinese. Chinese skills are suffixed (e.g. `-zh`) in the folder name.

---

## Installation

Pick the method that matches your AI client.

### Option A: Claude Code + Codex via npx

Install every Yuri skill globally for both Claude Code and Codex:

```bash
npx yuri-skills install
```

The npm package only ships the installer. Skills are downloaded from GitHub at install time, so skill updates only need to be pushed to this repository.

Install one or more skills:

```bash
npx yuri-skills install grill-me-harder
npx yuri-skills install grill-me-harder ruthless-paper-reviewer
```

Limit the target agent or install into the current project:

```bash
npx yuri-skills install --agent codex
npx yuri-skills install --agent claude
npx yuri-skills install --scope project
```

Pin installs to a branch, tag, or commit:

```bash
npx yuri-skills install --ref v0.1.0
```

Remove Yuri skills from the same default global locations:

```bash
npx yuri-skills remove
```

Defaults: all skills, both Claude and Codex, user-global install, GitHub `main` branch. The installer supports macOS, Linux, and Windows.

### Option B: Claude.ai web / desktop app (recommended for non-technical users)

1. Open the [dist/](dist/) directory.
2. Download the `<skill-name>.skill` file you want.
3. In Claude.ai, go to **Settings → Capabilities → Skills → Upload skill**.
4. Select the downloaded `.skill` file. Done.

### Option C: Manual install

You can also copy a skill folder directly into your agent's skills directory.

**Claude Code global install** (available in every project):

```bash
# macOS / Linux
cp -r skills/<skill-name> ~/.claude/skills/

# Windows (PowerShell)
Copy-Item -Recurse skills\<skill-name> $env:USERPROFILE\.claude\skills\
```

**Claude Code project-scoped install** (current repo only):

```bash
cp -r skills/<skill-name> <your-project>/.claude/skills/
```

**Codex project-scoped install** (current repo only):

```bash
# macOS / Linux
mkdir -p .agents/skills
cp -r skills/<skill-name> .agents/skills/

# Windows (PowerShell)
New-Item -ItemType Directory -Force .agents\skills
Copy-Item -Recurse skills\<skill-name> .agents\skills\
```

**Codex user-scoped install** (available in every project):

```bash
# macOS / Linux
mkdir -p ~/.agents/skills
cp -r skills/<skill-name> ~/.agents/skills/

# Windows (PowerShell)
New-Item -ItemType Directory -Force $HOME\.agents\skills
Copy-Item -Recurse skills\<skill-name> $HOME\.agents\skills\
```

Restart Claude Code or Codex if the new skill does not appear. Some older Codex setups may use `~/.codex/skills`; prefer `.agents/skills` for new installs.

---

## Triggering skills

After installation, Claude Code and Codex can auto-trigger skills based on each skill's `description` field in `SKILL.md`.

You can also invoke the intended behavior directly in natural language, for example:

```text
grill me on this design
pressure test this plan
拷打我这个方案
帮我锐评这篇论文
```

Chinese-language skills use the `-zh` suffix and include Chinese trigger phrasing in their own `SKILL.md`.

---

## Available skills

> This list grows as new skills are added. Each skill's `SKILL.md` has full details and trigger examples.

| Skill | What it does | Source |
| --- | --- | --- |
| [grill-me-harder](skills/grill-me-harder/) | Adversarially interviews you about a plan or design, one branch at a time, until every decision is concrete. | Adapted from [mattpocock/skills · grill-me](https://github.com/mattpocock/skills) |
| [grill-me-harder-zh](skills/grill-me-harder-zh/) | 中文版"拷打我"。用调侃但不留情面的语气，逐个分支把你的方案追问到落地，直到你"悟了"。 | Adapted from [mattpocock/skills · grill-me](https://github.com/mattpocock/skills) |
| [ruthless-paper-reviewer](skills/ruthless-paper-reviewer/) | Ruthlessly roasts an academic paper. Hunts for fatal logic flaws, tech-washing, dataset-timeline mismatches, and unsupported conclusions. Evidence-grounded, no "pros and cons" essays. | Original |
| [ruthless-paper-reviewer-zh](skills/ruthless-paper-reviewer-zh/) | 中文版"学术论文锐评"。B 站锐评味儿打底，第一性原理收尾——专治缝合怪、A+B 灌水、跑分游戏、Math/Tech-washing。皮调侃，骨头硬。 | Original |

---

## For contributors

See [CLAUDE.md](CLAUDE.md) for the full skill-authoring workflow — you can hand it to Claude Code and have it walk through the process.

Package a skill:

```bash
python scripts/package_skill.py skills/<skill-name>
# Output: dist/<skill-name>.skill
```

---

## License

MIT — see [LICENSE](LICENSE).
