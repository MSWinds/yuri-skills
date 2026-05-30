# Systematic reviews, meta-analyses & surveys

Use for papers whose core contribution is a synthesis of prior work rather than new primary
evidence. The "issues" here are the body of literature; the "evaluation" is whether the
synthesis method is sound and the coverage unbiased.

## Traceability chain — columns

| Column | What goes here |
|---|---|
| Review question | Each question/objective the review sets out to answer, page-anchored. |
| Inclusion / synthesis method | Search strategy, inclusion/exclusion criteria, and how studies are synthesized. |
| Coverage / bias | Whether coverage is complete and representative, and what biases threaten it. |
| Conclusion | Whether the synthesized conclusion is warranted by the included evidence. |

This is the `D/I, E/U` issue coding scaled up: inclusion criteria are explicit `E` decisions;
missing literature clusters the authors never mention are `U` — the review's blind spots.

## What to assess (PRISMA-style)

- **Search reproducibility.** Are databases, search strings, dates, and screening steps reported
  well enough to reproduce the search? A PRISMA-style flow (records identified → screened →
  included, with exclusion counts and reasons) is the standard.
- **Inclusion/exclusion criteria.** Are they pre-specified and applied consistently, or
  post-hoc and selective?
- **Selection / publication bias.** Does the corpus over-represent positive results, a single
  venue/lab, a language, or a time window? For meta-analysis, was publication bias assessed
  (e.g. funnel plot, Egger's test)?
- **Synthesis method fit.** Does the synthesis match the heterogeneity of the studies? Pooling
  heterogeneous studies in a fixed-effect meta-analysis is a mismatch; narrative synthesis where
  quantitative pooling was feasible may waste evidence.
- **Quality appraisal of included studies.** Were the included studies' own validity assessed, or
  treated as uniformly trustworthy?
- **Conclusion calibration.** Does the strength of the conclusion match the quantity and quality
  of evidence behind it?

## Type-specific failure modes (map to Gaps A/B/C)

- **Gap A (orphan):** a review question posed but not actually answered by the synthesis.
- **Gap B (biased coverage):** missing literature clusters (`U`), selection/publication bias, or
  inclusion criteria that quietly exclude disconfirming work.
- **Gap C (synthesis overreach):** a synthesis method mismatched to study heterogeneity, or a
  conclusion stronger than the pooled evidence supports.

## References to cite when relevant

- PRISMA 2020 statement (Page et al., *BMJ*) for reporting standards.
- Kitchenham & Charters (2007) for systematic literature reviews in computing/software.
- Webster & Watson (2002), "Analyzing the Past to Prepare for the Future", *MIS Q* (IS reviews).
