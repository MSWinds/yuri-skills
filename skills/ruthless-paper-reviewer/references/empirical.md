# Empirical & machine-learning papers

Use for papers whose core contribution is a hypothesis or research question tested against
data. Most quantitative social-science studies and most ML benchmark/empirical papers fall
here. If the paper also *builds* a method or model as its contribution, treat it as a hybrid
and also run `dsr.md` (the model is the artifact; benchmark comparison is its evaluation).

## Traceability chain — columns

| Column | What goes here |
|---|---|
| Hypothesis / RQ | Each testable claim, drawn from the FP, page-anchored. |
| Construct + operationalization | How each variable/construct is defined and measured. The link between the abstract concept and the concrete measure. |
| Method / design | Sample/data, design (experiment, observational, benchmark), and the specific test or comparison used. |
| Finding | The result, and whether it actually supports the hypothesis at the claimed strength. |

## Validity framework to apply (Shadish, Cook & Campbell)

Assess all four; name which are threatened and how.

- **Construct validity** — does the measure capture the intended concept? In ML: does the
  benchmark/metric actually measure the capability claimed (e.g. accuracy on a leaked test set
  measures memorization, not generalization)?
- **Internal validity** — is the inferred cause→effect relationship sound, or are there
  confounds/alternative explanations? In ML: confounds like tuning on the test set, unequal
  compute budgets across baselines, unfair hyperparameter search.
- **External validity** — do the findings generalize beyond this sample/dataset/setting? In ML:
  single dataset, single seed, narrow distribution, no out-of-distribution test.
- **Statistical-conclusion validity** — are the statistics appropriate and adequately powered?
  In ML: no error bars / variance across seeds, no significance test, cherry-picked metrics.

## Type-specific failure modes (map to Gaps A/B/C)

- **Gap A (orphan):** a hypothesis stated but never tested; a research question in the intro
  with no corresponding result.
- **Gap B (unmeasured):** a construct asserted but poorly operationalized, or a claimed effect
  with no reported test/baseline/ablation isolating it.
- **Gap C (invalid):** a conclusion that outruns the evidence — overclaiming generality from one
  dataset, causal language from observational data, "SOTA" without matched baselines or
  significance, or a validity threat (above) left unaddressed.

## ML-specific reviewing checklist (NeurIPS-style)

Modern ML venues ask reviewers to check, and these map cleanly onto the chain:

- **Claims match evidence/scope** — do abstract and intro claims match what the experiments and
  theory actually show, including stated assumptions and limitations? Overclaiming is a Gap C.
- **Reproducibility** — are there enough details (data splits, hyperparameters and how they were
  chosen, compute, code/data availability) to reproduce the main results? Missing reproducibility
  is a weakness to record. "No, because proprietary" is an acceptable author answer if stated.
- **Baselines & ablations** — are comparisons fair (matched compute/tuning) and do ablations
  isolate the contribution's effect? Missing ablation for a claimed component is a Gap B.
- **Statistical rigor** — variance across seeds/runs, error bars, significance where relevant.
- **Honest limitations** — authors are credited, not penalized, for stating limitations openly;
  the failure is hidden or unacknowledged limitations (Gap C / `U` issues).

## References to cite when relevant

- Shadish, Cook & Campbell (2002), *Experimental and Quasi-Experimental Designs*.
- NeurIPS Paper Checklist & Reviewer Guidelines (claims-match-scope, reproducibility,
  soundness of empirical methodology).
