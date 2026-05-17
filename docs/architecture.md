# Architecture

## Core idea

`fraud-click-filter` sits in front of analytics and attribution, not behind them. The goal is to make traffic decisions early enough that dashboards keep describing human demand instead of bot noise.

## Surface model

- overview
  - current event counts, challenge/drop posture, and spend-at-risk summary
- filter lane
  - click-level decisions across paid-search, display, affiliate, and social traffic
- threat signals
  - campaign patterns expressed in revenue language
- verification
  - the modeling claims this repo is making about traffic integrity

## Data model

The sample layer carries:
- `TrafficEvent`
  - source channel
  - trust decision
  - IP reputation
  - device risk
  - click velocity
  - spend at risk
- `FilterRule`
  - rule name
  - decision
  - coverage
  - commercial impact
- `ThreatSignal`
  - affected clicks
  - spend at risk
  - severity
  - explanation

## Why this matters commercially

Growth teams do not just need fewer bots. They need:
- cleaner CAC
- cleaner attribution
- cleaner conversion rates
- cleaner pipeline source reporting

That is why this repo is framed as a revenue integrity surface, not a generic security dashboard.
