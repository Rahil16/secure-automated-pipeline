# Automated DevSecOps Pipeline

A small Node.js/Express application deliberately containing security issues, used to demonstrate an automated DevSecOps workflow in GitHub Actions.

> **Learning project only.** The application is intentionally vulnerable (featuring fake AWS credentials and vulnerable dependencies such as `"lodash": "4.17.4"`). Never add real credentials or deploy this application.

## What the pipeline checks

Every push and pull request to `main` runs the security workflow:

| Check | Tool | Purpose |
| --- | --- | --- |
| Secret scanning | TruffleHog | Detects exposed credentials and tokens in the repository history. |
| Dependency scanning | Snyk | Identifies known vulnerabilities in npm dependencies and uploads results to GitHub Security. |
| Static code analysis | CodeQL | Finds security weaknesses in JavaScript/TypeScript code using the `security-extended` query suite. |
| Dependency updates | Dependabot | Opens daily update proposals for npm dependencies. |

CodeQL also runs on a weekly schedule, so new detections can surface even when the code has not changed.

## Repository layout

```text
.
|-- app.js                         # Intentionally vulnerable demo API
|-- package.json                   # Node.js dependencies
|-- .github
    |-- dependabot.yml              # Daily dependency update configuration
    |-- workflows
        |-- codeql.yml              # CodeQL analysis
        └-- security.yml            # TruffleHog and Snyk scans
```

## Getting started

### Prerequisites

- Node.js 22 or later
- npm

### Install dependencies

```bash
npm ci
```

### Enable Snyk scanning in GitHub

Add a repository secret named `SNYK_TOKEN` with a Snyk API token. The workflow will then scan dependencies and upload its SARIF report to the repository's **Security** tab.

## Intentional findings

The demo app contains deliberate vulnerabilities to confirm that each pipeline check works as expected. Do not copy these patterns into production code:

- **Vulnerable dependency (`"lodash": "^4.17.4"`):** Intentionally locked to an outdated release in [`package.json`] with known vulnerabilities (including Prototype Pollution and ReDoS). This allows **Snyk** to detect dependency risks and **Dependabot** to trigger automated remediation pull requests.
- **Hard-coded secrets (`app.js`):** Example AWS keys from documentation used to verify **TruffleHog** secret scanning.
- **Remote Code Execution (`app.js`):** An unsanitized `eval()` endpoint (`/calculate`) used to verify **CodeQL** static analysis alerts.

## Viewing results

After a push or pull request, open the repository's **Actions** tab to see each workflow run. CodeQL and Snyk results appear under **Security → Code scanning alerts** when GitHub code scanning is available for the repository.

## Screenshots

<img width="1311" height="27" alt="Screenshot 2026-09-11 210445" src="https://github.com/user-attachments/assets/752a933e-b27d-4b6b-8b36-b58493d71f51" />
<img width="1402" height="867" alt="Screenshot 2026-09-11 210549" src="https://github.com/user-attachments/assets/f2cda82a-db71-4992-8eaf-4fb624f485ab" />
<img width="1491" height="172" alt="Screenshot 2026-09-11 210603" src="https://github.com/user-attachments/assets/866eaf43-8c92-4b3d-b224-b2b82e5a2e74" />

## License

MIT
