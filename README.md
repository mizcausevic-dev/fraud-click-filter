# Fraud Click Filter

TypeScript control plane for filtering fraudulent or low-trust clicks before they pollute analytics, attribution, and paid-efficiency reporting.

- Live: [http://fraud.kineticgain.com/](http://fraud.kineticgain.com/)
- Repo: [https://github.com/mizcausevic-dev/fraud-click-filter](https://github.com/mizcausevic-dev/fraud-click-filter)

## Why this exists

Traffic quality is usually treated like a security problem after the damage is already in the dashboards. By then:
- paid campaigns look healthier than they really are
- attribution models start giving credit to synthetic demand
- affiliate and retargeting channels absorb spend without earning real pipeline
- Growth and RevOps teams make commercial decisions on dirty traffic

`fraud-click-filter` models the traffic-integrity layer early enough to protect revenue reporting before bad clicks become fake performance.

## What this product does

`fraud-click-filter` filters low-trust traffic before it contaminates attribution, CAC, paid-efficiency reporting, affiliate payouts, or lead scoring. The output is not just a blocked-click count; it is a revenue-trust lane that tells growth and RevOps teams which clicks should be allowed, challenged, or dropped.

A SaaS go-to-market analyst can use it to compare campaign source, click velocity, device risk, IP reputation, challenged sessions, dropped sessions, and spend at risk before making budget decisions. A SaaS value architect can use it to frame the commercial case: less paid spend wasted on synthetic demand, fewer false-positive channels, cleaner affiliate economics, and more reliable pipeline attribution.

Technically, the repo exposes filter-lane events, traffic rules, threat signals, JSON endpoints, prerendered pages, screenshots, and verification notes without requiring production ad-platform credentials. The common Kinetic Gain pattern is converting hidden operating drag into named evidence, scored pressure, owner-readable decisions, and a concise executive story.

## Routes

- `/`
- `/filter-lane`
- `/threat-signals`
- `/verification`
- `/docs`

## API

- `/api/dashboard/summary`
- `/api/filter-lane`
- `/api/rules`
- `/api/threat-signals`
- `/api/verification`
- `/api/sample`

## Screenshots

![Overview](./screenshots/01-overview-proof.png)
![Filter lane](./screenshots/02-filter-lane-proof.png)
![Threat signals](./screenshots/03-threat-signals-proof.png)
![Verification](./screenshots/04-verification-proof.png)

## Local Development

```powershell
cd fraud-click-filter
npm install
npm run dev
```

Open:
- [http://127.0.0.1:5262/](http://127.0.0.1:5262/)
- [http://127.0.0.1:5262/filter-lane](http://127.0.0.1:5262/filter-lane)
- [http://127.0.0.1:5262/threat-signals](http://127.0.0.1:5262/threat-signals)
- [http://127.0.0.1:5262/verification](http://127.0.0.1:5262/verification)
- [http://127.0.0.1:5262/docs](http://127.0.0.1:5262/docs)

## Validation

- `npm run prerender`
- `npm run build`
- `npm run test`
- `npm run demo`
- `npm run smoke`
- `npm run render:assets`

## Docs

- [Architecture](./docs/architecture.md)
- [Origin](./docs/ORIGIN.md)
- [Changelog](./CHANGELOG.md)
