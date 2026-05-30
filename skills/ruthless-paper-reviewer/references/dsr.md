# Design-science (DSR) papers

Use for papers whose core contribution is a *built artifact* evaluated for utility: a system,
an algorithm/method offered as a tool, a model, a construct, a method, or an instantiation.

## Traceability chain — columns

| Column | What goes here |
|---|---|
| Lowest-level issue | Each design objective/requirement from the FP, page-anchored, coded D/I. |
| Artifact component | The specific part of the artifact (and its artifact type) that addresses the issue. |
| Evaluation method | How that component is evaluated, and whether the method is appropriate. |
| Result | What the evaluation showed, and whether it was adequate for the issue. |

## Artifact types (Hevner et al. 2004)

Classify each artifact: **construct** (vocabulary/concepts), **model** (abstraction/representation),
**method** (algorithm/practice), or **instantiation** (a working system). The expected evaluation
differs by type — an instantiation invites demonstration/field use; a method invites benchmarking.

## Evaluation framework to apply (FEDS — Venable, Pries-Heje & Baskerville 2016)

A sound DSR evaluation answers why, when, how, and what to evaluate. FEDS characterizes each
evaluation episode on two dimensions:

- **Functional purpose:** *formative* (to improve the artifact during development) vs *summative*
  (to judge the finished artifact).
- **Paradigm:** *artificial* (lab, simulation, criteria-based, controlled) vs *naturalistic*
  (real users, real tasks, real settings).

The FEDS design process has four steps: (1) explicate evaluation goals, (2) choose strategy/
strategies, (3) determine the properties to evaluate, (4) design the evaluation episodes. Use
this to judge whether the authors' evaluation is *appropriate* for each artifact and issue —
e.g. a utility claim for real-world deployment needs naturalistic, summative evidence, not only
an artificial informed argument.

Common DSR evaluation methods: expert evaluation, informed argument, prototype/demonstration,
controlled experiment, simulation, case study, field study, technical action research.

## Type-specific failure modes (map to Gaps A/B/C)

- **Gap A (orphan):** a design objective/issue with no artifact component addressing it.
- **Gap B (unevaluated):** an artifact component that is built but never evaluated, or an issue
  marked "did not evaluate / N/A".
- **Gap C (inappropriate evaluation):** an evaluation method mismatched to the artifact or claim
  — e.g. informed argument used where the system needs expert/empirical input; artificial-only
  evaluation backing a naturalistic utility claim; evaluation that tests a different property than
  the one the issue requires.

## References to cite when relevant

- Hevner, March, Park & Ram (2004), "Design Science in Information Systems Research", *MIS Q*.
- Venable, Pries-Heje & Baskerville (2016), "FEDS: A Framework for Evaluation in Design Science
  Research", *EJIS* 25(1):77–89.
- Gregor & Hevner (2013) on DSR positioning and contribution types; Peffers et al. (2007) DSRM.
