# The diagnostic engine

This is the method underneath the roast. The persona surfaces findings; this file is how you
*find* them rigorously rather than by free association. In first-hit mode you run this in your
head and surface only the ≤3 worst breaks. In full-referee mode you run it on paper and produce
the matrix and gap list per `report_template.md`.

The intellectual core is a **traceability chain**: every problem the paper claims to address must
trace to a contribution, then to an evaluation/test, then to a result. Wherever the chain breaks
is a defect — and each defect is also a candidate research opportunity.

The skeleton is invariant across paper types. Only the *middle columns* of the chain swap with the
paper's core contribution (see the type table below and the per-type reference files).

## Step 0 — Detect type and calibrate depth

1. **Skim first.** Abstract, intro, contributions, method headings. Type detection and depth both
   depend on it. Never skip it.
2. **Match depth to the request.** A "thoughts?" / "is this any good?" / "roast it" gets the
   compressed strike (≤3 findings, gap-tagged, in prose). A "full review" / "referee this" /
   "find all the gaps" gets the full structured report (Steps 1–7 below).
3. **Detect the type** — it fixes the middle of the chain and which reference file to load:

| Core contribution | Type | Load | Middle of the chain |
|---|---|---|---|
| A built artifact (system, model-as-tool, method, framework, instantiation) evaluated for utility | DSR | `dsr.md` | issue → artifact component → evaluation method → result |
| A hypothesis/RQ tested against data (incl. most ML benchmark/empirical papers) | Empirical | `empirical.md` | hypothesis → construct + operationalization → method/design → finding |
| A proposition/theory argued without primary data | Theory | `theory.md` | claim → premise/mechanism → logical validity → conclusion |
| A synthesis of prior work (systematic review, meta-analysis, survey) | Review | `review.md` | review question → inclusion/synthesis method → coverage/bias → conclusion |

If the paper is a hybrid (common: an ML paper that both *builds* a method and *tests* it), load
both relevant files and run the chain twice — once treating the method as an artifact, once
treating the performance claims as hypotheses. State that you did so.

## Step 1 — Separate the Informal and Formal Problem

The most-skipped and most-important step. Do it for every type.

- **Informal Problem (IP):** the messy real-world motivation. One paragraph (problem, context,
  significance, gap, focus), then one distilling sentence.
- **Formal Problem (FP):** the precise, bounded problem the contribution actually addresses, with
  the authors' stated assumptions, limitations, and definitions. One paragraph, then one sentence.

The diagnostic payoff is the **gap between IP and FP**: does the formal problem actually serve the
informal motivation, or has the paper quietly narrowed/shifted the problem to something easier?
Name any drift — it is one of the sharpest findings a reviewer can land.

## Step 2 — Decompose into issues with evidence coding

Build the issue tables. Every row needs a page/section anchor and an evidence code. This converts
impressions into checkable analysis. Do not write a claim you cannot anchor.

- **Issues covered** (Table A) — code each `D` (Directly stated) or `I` (Implied).
- **Issues NOT covered** (Table B) — code each `E` (Explicitly excluded) or `U` (Unmentioned).

Research gaps live disproportionately in the **`U` column**: things neither solved nor even
acknowledged. Excluded (`E`) items are deliberate scope choices; unmentioned (`U`) items are blind
spots. Distinguish them sharply.

Then **refine** into a final hierarchical set of lowest-level issues (label 1, 1.1, 1.2, 2, …).
These lowest-level issues are the rows of the traceability matrix in Step 4.

## Step 3 — Assess the Formal Problem

Evaluate, with reasons: internal consistency among issues; whether the authors' assumptions justify
the FP; the scope of the FP relative to its claimed significance; the validity of the FP; and how
the authors justify its importance. End with a one-paragraph summary judgment.

## Step 4 — Build the traceability matrix (the diagnostic engine)

For each lowest-level issue, fill the chain using the columns for the paper's type. Load the type's
reference file for column definitions, the validity/evaluation framework to apply, and the
type-specific failure modes.

Three gap types fall out of an incomplete matrix — these are the heart of the review and the labels
the roast uses:

- **Gap A — orphan problem:** an issue with no corresponding contribution/solution.
- **Gap B — unevaluated/unmeasured contribution:** a contribution that is never tested/evaluated, or
  a construct asserted but never properly measured.
- **Gap C — invalid evaluation / overreach:** an evaluation that is inappropriate, or a claim that
  exceeds what the evidence supports.

Be specific and cite the location. "Issue 2.1 (robustness) maps to no experiment — Gap B, §4" is
useful; "the evaluation is weak" is not.

## Step 5 — Strengths and limitations

Separate what the paper does well from where it falls short, grounded in the matrix and the type's
validity framework. Even in roast mode, a genuine strength stated plainly makes the attacks more
credible — but never pad with manufactured praise. State strengths only where the text earns them.

## Step 6 — Research opportunities

Each Gap A/B/C from Step 4 becomes a concrete future-research opportunity. For each, name the
skills, knowledge, and resources needed to address it, and what would be learned. Opportunities must
trace back to a specific gap — do not invent directions unconnected to the analysis.

## Step 7 — Knowledge gained

Record what the review taught you, organized by knowledge area (Problem/Issues, Contribution,
Evaluation, Method). This turns a one-off review into reusable methodological knowledge.

## Operating rules (apply in both modes)

- **Anchor everything.** Every issue, assumption, and claim gets a page/section/figure reference.
  Unanchored assertions are the failure mode this method exists to prevent.
- **Paraphrase, never copy.** Quote sparingly (a short phrase only when exact wording is
  load-bearing). Do not reproduce paragraphs, figures, or tables verbatim.
- **Don't fabricate.** If a number, citation, or method detail isn't in the paper, say it's absent —
  never invent it. "Not reported" is a finding, not a hole to fill.
- **Charity before attack.** Steelman the authors' argument before critiquing it. Distinguish a
  genuine flaw from a stylistic preference. (The roast is brutal about *real* breaks, not about taste.)
- **Calibrate confidence.** Separate "the paper is wrong" from "the paper does not show X". Flag where
  your own domain knowledge is thin rather than bluffing.
- **The gap list is the payoff.** A full review without an explicit, located Gap A/B/C list and the
  opportunities derived from it is incomplete.
