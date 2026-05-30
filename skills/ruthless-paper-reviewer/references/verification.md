# Verification protocol (subagents + inline)

This file expands the "Going deeper" verification step of SKILL.md. Read it when the review is
substantive enough to warrant independent checking and your runtime supports it. A roast that
lands a `fatal · Gap C` on a SOTA claim is only as good as the check behind it.

## Capability gate

First determine what the runtime supports — gate on the capability itself, not on the name of
the environment (environments change and any list goes stale):

- **Subagents/parallel tasks available:** use Tier 2 below. Confirm by checking whether a tool to
  spawn subagents or dispatch parallel tasks is actually present, rather than assuming.
- **No subagents:** use Tier 1 (inline) only. Do all verification yourself with
  `web_search`/`web_fetch`, sequentially. Do not pretend to spawn agents.

Never make Tier 2 mandatory. A skill that hard-requires subagents breaks in environments without
them. Tier 2 is an amplifier, not a prerequisite.

## What is worth verifying (both tiers)

Verify selectively — checking everything wastes effort. Prioritize claims where being wrong
changes the review's conclusion:

1. **SOTA / superiority claims.** Is the reported result actually state-of-the-art, or are
   stronger published baselines omitted? Are compared baselines tuned/resourced fairly?
2. **Novelty claims.** Has the "first to do X" been done before? A missed prior work is both a
   factual error and a `U`-coded issue.
3. **Characterization of prior work.** Papers often misstate what a cited work showed to
   manufacture a gap. Check the original against the paper's summary of it.
4. **Key statistics and numbers.** Spot-check headline figures for internal consistency and,
   where external, against the source.
5. **Method appropriateness.** Confirm the statistical test / evaluation method is the accepted
   one for this design (cross-check against the type's validity framework, not just intuition).
6. **Dataset / benchmark facts.** Size, splits, known leakage or contamination issues, whether
   the benchmark measures the claimed capability.

Each verified item feeds a specific cell of the traceability matrix or a Gap C judgment.

## Tier 2 delegation patterns

### Pattern 1 — Claim/citation audit (parallel, one task per claim)
Give each subagent ONE claim and a narrow brief:
```
Task: Verify this claim from the paper under review.
Claim (verbatim location): "<short paraphrase>" — <paper>, §X / p.N.
Do: search external sources; determine if the claim is supported.
Return ONLY: {verdict: confirmed | contradicted | unverifiable,
              evidence: <source URL or citation + one-line reason>,
              confidence: high | medium | low}.
Do not editorialize. If you cannot find evidence, return unverifiable.
```
Synthesize verdicts into the matrix. A `contradicted` on a load-bearing claim is a major finding;
several `unverifiable` results lower the overall confidence of the verdict.

### Pattern 2 — Independent matrix rows (parallel, one task per issue cluster)
Hand each subagent the paper plus a subset of lowest-level issues; ask it to build those rows of
the chain (contribution component → evaluation → result) independently, with anchors. Reconcile
against your own pass. Where an independent reader maps an issue differently, or finds a Gap you
missed, investigate — divergence is the value, not noise.

### Pattern 3 — Adversarial pass (two tasks, then synthesize)
- Steelman agent: "Make the strongest honest case that this paper's contribution is sound and
  significant. Cite the paper's actual evidence."
- Skeptic agent: "Make the strongest honest case that this paper's claims are not supported.
  Cite specific gaps/threats."
Then synthesize: where steelman and skeptic disagree on the same point is exactly where the
review's judgment must be most careful and most explicit.

## Synthesis discipline

- Do not concatenate subagent outputs into the report. Integrate verdicts into the relevant
  matrix cell, gap, or assessment, and resolve conflicts explicitly.
- Treat subagent output as evidence to weigh, not as authority. An `unverifiable` is not a pass.
- Keep the audit trail: in the report, a verified claim can note its check (e.g. "SOTA claim
  checked against [source]; a stronger baseline exists — Gap C"). This is what makes the review
  defensible rather than asserted.
- Cost control: cap the number of parallel checks to the genuinely decision-relevant claims.
  A 30-claim audit on a paper whose verdict turns on two of them is wasted compute.
