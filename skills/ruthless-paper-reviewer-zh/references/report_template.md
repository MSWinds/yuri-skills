# Report template (full-referee mode)

Use this structure for the full review report produced in "Going deeper" mode. It is
paper-type-agnostic; rename the middle-column labels in Sections 4–5 to match the type detected
in `diagnostic.md` Step 0 (see the type's reference file). Tables use the evidence codes:
D = Directly stated, I = Implied, E = Explicitly excluded, U = Unmentioned. Every row carries a
page/section anchor in the `#` column.

Keep the voice sharp. This template organizes the work; it does not license hedging or a
balanced "pros and cons" essay. Findings still carry severity + gap type.

```markdown
# Review: [Paper Title] — [Authors], [Year], [Venue]

**Paper type:** [DSR | Empirical/ML | Theory | Review] (and whether hybrid)

## 1. Informal Problem (IP)
[One paragraph: problem, context, significance, gap, focus.]
**Essence (one sentence):** …

## 2. Formal Problem (FP)

### 2a. Issues covered
| Label | Issue name | Evidence from paper | D/I | # |
|---|---|---|---|---|

### 2b. Issues not covered
| Label | Issue name | Basis | E/U | # |
|---|---|---|---|---|

### 2c. Final lowest-level issue set (the matrix rows)
| Label | Issue name | Description | D/I | # |
|---|---|---|---|---|
| 1 | … | | | |
| 1.1 | … | | | |

### 2d. FP statement
[One paragraph FP, then one-sentence essence.]
- **Assumptions (authors'):** …
- **Limitations (authors'):** …
- **Definitions (authors'):** …
- **IP→FP drift:** [does the FP serve the IP, or has the problem narrowed/shifted?]

## 3. FP assessment
[Consistency among issues; whether assumptions justify the FP; scope vs significance;
validity of the FP; how authors justify its importance; one-paragraph summary judgment.]

## 4. Contribution assessment
[Rename per type: "Solution/artifact" (DSR) | "Method & results" (empirical) |
"Argument" (theory) | "Synthesis" (review).]
[Describe the contribution; list its components/claims and explain each in your own words.]

| Lowest-level issue | Contribution component | Assessment |
|---|---|---|

## 5. Evaluation assessment
[Apply the type's validity/evaluation framework from its reference file.]

| Issue/contribution | Evaluation/test method | Appropriate? | What authors actually did |
|---|---|---|---|

| Lowest-level issue | Adequately evaluated? | Description of results (page #) |
|---|---|---|

[Strengths and limitations of the evaluation approach.]

## 6. Gaps (the diagnostic output)
Each gap carries severity (fatal / serious / minor) + located evidence.
- **Gap A (orphan problem):** …  [severity · located]
- **Gap B (unevaluated/unmeasured):** …  [severity · located]
- **Gap C (invalid/overreaching):** …  [severity · located]

## 7. Research opportunities
[Each opportunity traces to a specific gap above. For each: the opportunity, the skills/
knowledge/resources needed, and what would be learned.]

## 8. Knowledge gained
| Knowledge gained | Area | Description |
|---|---|---|

## References
[APA. Cite the reviewed paper and any framework used. Paraphrase; do not reproduce text.]
```
