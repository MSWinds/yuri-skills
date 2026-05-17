# yuri-skills

A curated collection of Claude skills for AI workflows, engineering, research, and productivity.

Each skill is a self-contained folder under `skills/`. Pre-packaged `.skill` files for one-click install live in `dist/`.

Skills may be authored in English or Chinese. Chinese skills are suffixed (e.g. `-zh`) in the folder name.

---

## Installation

Pick the method that matches your Claude client.

### Option A: Claude.ai web / desktop app (recommended for non-technical users)

1. Open the [dist/](dist/) directory.
2. Download the `<skill-name>.skill` file you want.
3. In Claude.ai, go to **Settings → Capabilities → Skills → Upload skill**.
4. Select the downloaded `.skill` file. Done.

### Option B: Claude Code (CLI / IDE extension)

Just copy the skill folder into Claude's skills directory — no packaging needed.

**Global install** (available in every project):

```bash
# macOS / Linux
cp -r skills/<skill-name> ~/.claude/skills/

# Windows (PowerShell)
Copy-Item -Recurse skills\<skill-name> $env:USERPROFILE\.claude\skills\
```

**Project-scoped install** (current repo only):

```bash
cp -r skills/<skill-name> <your-project>/.claude/skills/
```

Restart Claude Code. The skill will auto-trigger in matching conversations.

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
