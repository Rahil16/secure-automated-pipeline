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

- **Vulnerable dependency (`"lodash": "^4.17.4"`):** Intentionally locked to an outdated release in [`package.json`](file:///c:/Users/rahil/OneDrive/Documents/Coding%20Projects/Automated%20DevSecops%20Pipeline/secure%20pipeline/package.json) with known vulnerabilities (including Prototype Pollution and ReDoS). This allows **Snyk** to detect dependency risks and **Dependabot** to trigger automated remediation pull requests.
- **Hard-coded secrets (`app.js`):** Example AWS keys from documentation used to verify **TruffleHog** secret scanning.
- **Remote Code Execution (`app.js`):** An unsanitized `eval()` endpoint (`/calculate`) used to verify **CodeQL** static analysis alerts.

## Viewing results

After a push or pull request, open the repository's **Actions** tab to see each workflow run. CodeQL and Snyk results appear under **Security → Code scanning alerts** when GitHub code scanning is available for the repository.

## License

MIT
