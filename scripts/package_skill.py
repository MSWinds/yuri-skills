"""Package skill folder(s) into .skill files (zip with renamed extension).

Usage:
    python scripts/package_skill.py skills/<skill-name>     # one skill
    python scripts/package_skill.py skills/a skills/b        # several
    python scripts/package_skill.py --all                    # every skill under skills/

Output:
    dist/<skill-name>.skill
"""

from __future__ import annotations

import sys
import zipfile
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
DIST_DIR = REPO_ROOT / "dist"
SKILLS_DIR = REPO_ROOT / "skills"


def all_skill_dirs() -> list[Path]:
    return sorted(p.parent for p in SKILLS_DIR.glob("*/SKILL.md"))


def parse_frontmatter(skill_md: Path) -> dict[str, str]:
    text = skill_md.read_text(encoding="utf-8")
    if not text.startswith("---"):
        raise ValueError(f"{skill_md} missing YAML frontmatter (must start with ---)")
    _, fm, _ = text.split("---", 2)
    out: dict[str, str] = {}
    for line in fm.strip().splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            out[k.strip()] = v.strip()
    return out


def validate(skill_dir: Path) -> str:
    if not skill_dir.is_dir():
        raise SystemExit(f"Not a directory: {skill_dir}")
    skill_md = skill_dir / "SKILL.md"
    if not skill_md.is_file():
        raise SystemExit(f"Missing SKILL.md in {skill_dir}")
    fm = parse_frontmatter(skill_md)
    for key in ("name", "description"):
        if not fm.get(key):
            raise SystemExit(f"SKILL.md frontmatter missing required field: {key}")
    if fm["name"] != skill_dir.name:
        print(
            f"warning: frontmatter name '{fm['name']}' != folder name '{skill_dir.name}'",
            file=sys.stderr,
        )
    return fm["name"]


def package(skill_dir: Path) -> Path:
    name = validate(skill_dir)
    DIST_DIR.mkdir(exist_ok=True)
    out_path = DIST_DIR / f"{name}.skill"
    with zipfile.ZipFile(out_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for file in skill_dir.rglob("*"):
            if file.is_file():
                zf.write(file, file.relative_to(skill_dir.parent))
    return out_path


def main() -> None:
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        raise SystemExit(1)

    if "--all" in args:
        targets = all_skill_dirs()
        if not targets:
            raise SystemExit(f"No skills found under {SKILLS_DIR}")
    else:
        targets = [Path(a).resolve() for a in args]

    for target in targets:
        out = package(target)
        print(f"Packaged: {out.relative_to(REPO_ROOT)}")


if __name__ == "__main__":
    main()
