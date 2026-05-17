# CLAUDE.md — yuri-skills working guide

This repo is a Claude **skill factory**: sources live in `skills/`, packaged artifacts in `dist/`. README is for end users; this file is for Claude Code (you) and future contributors.

Skills may be written in English or Chinese. Chinese-language skills use a language suffix in the folder name (e.g. `commit-writer-zh`). The skill's body content can be in whichever language fits its users.

## Repo layout

```text
yuri-skills/
├── skills/<skill-name>/      # Source (one folder per skill)
│   ├── SKILL.md              # Required. YAML frontmatter + body
│   ├── scripts/              # Optional. Executable scripts
│   ├── references/           # Optional. Supporting docs
│   └── assets/               # Optional. Templates / sample files
├── dist/<skill-name>.skill   # Packaged artifact (zip with renamed extension)
├── scripts/package_skill.py  # Packaging script
├── README.md                 # End-user install instructions
└── CLAUDE.md                 # This file
```

## Standard workflow for creating a new skill

When the user says "let's create a skill" / "new skill", follow this order:

1. **Clarify the need.** Ask what problem the skill solves, when it should trigger, and what it should produce. If the user provides an existing prompt or workflow as a reference, understand it first.
2. **Pick a name.** kebab-case, self-descriptive. Examples: `pdf-table-extractor`, `commit-message-writer`. Avoid generic names (`helper`, `utils`). Append `-zh` (or similar) if the skill is Chinese-language.
3. **Create the folder.** `skills/<skill-name>/`, starting with just `SKILL.md`.
4. **Write SKILL.md** (template below). The frontmatter `description` is the **only** signal Claude uses to decide when to invoke the skill — it must name concrete triggering scenarios.
5. **Test triggering locally.** Have the user open a fresh conversation and try the test prompts to confirm the skill auto-triggers and behaves correctly.
6. **Iterate.** Adjust description and body based on test results.
7. **Package.** `python scripts/package_skill.py skills/<skill-name>` → `dist/<skill-name>.skill`.
8. **Update README.** Add an entry under "Available skills".
9. **Commit.** Let the user decide the commit message. Do not commit on your own initiative.

## SKILL.md template

```markdown
---
name: skill-name-kebab-case
description: Third-person, scenario-specific description. State when the skill should trigger and what it does. Example: "Use when the user asks to extract tables from PDFs. Handles both scanned and native PDFs and outputs CSV or Markdown tables." Avoid vague "helps with X".
---

# Skill Title

## When to use
- 2-4 concrete triggering scenarios
- Phrase each as something a user might say, or a situation description

## Instructions
1. Step-by-step execution flow
2. Use imperatives
3. Reference files in `references/` or `scripts/` when needed

## Examples
(Optional) One or two end-to-end input → output examples.

## Constraints
(Optional) What not to do, edge cases.
```

The body of SKILL.md can be in Chinese if the skill is for Chinese-speaking users. The frontmatter `name` is always kebab-case ASCII; `description` should be in the language Claude will see the user speaking — usually English, but Chinese is fine if all target users converse in Chinese.

## Writing a good `description`

- **Third person.** "Use when the user asks to..." rather than "I will help you...".
- **Concrete verb + concrete object.** "Extracts tables from PDF" beats "PDF helper" by 10x.
- **Include trigger words.** Keywords the user is likely to say, file types, domain terms.
- **80–300 characters.** Too short lacks signal; too long dilutes it.

## Packaging details

A `.skill` file is just a zip of the skill folder with a renamed extension. `scripts/package_skill.py` does exactly that:

- Input: `skills/<name>/` (must contain `SKILL.md`)
- Output: `dist/<name>.skill`
- Validation: frontmatter must have `name` and `description`

## Install paths (reference)

- Claude Code global: `~/.claude/skills/<name>/` (Windows: `%USERPROFILE%\.claude\skills\<name>\`)
- Claude Code project-scoped: `<project>/.claude/skills/<name>/`
- Claude.ai web: upload the `.skill` file; Claude.ai unpacks it to `/mnt/skills/user/`

## Do not

- Do not create folders or write code before the requirement is confirmed.
- Do not commit unless the user explicitly says "commit".
- Do not write "do-everything" skills — one skill, one clear responsibility. Split rather than overload.
- Do not write filler like "This skill helps with various tasks" in the description.
