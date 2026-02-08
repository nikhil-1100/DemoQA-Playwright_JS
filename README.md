# Playwright Automation Framework (DemoQA)

A professional-grade UI test automation framework built using **Playwright**, designed with the **Page Object Model (POM)** for scalability and long-term maintainability. The framework supports **environment-based configuration**, **CI/CD execution**, and **high-fidelity Allure reporting** with single-file HTML support.

---

## 🚀 Key Features

- **Page Object Model (POM)** for clean separation of test logic and UI selectors
- **Environment-driven configuration** (no hardcoded URLs or credentials)
- **Cross-browser execution** using Playwright
- **Allure reporting** with single-file, shareable HTML reports
- **CI/CD ready** with GitHub Actions and manual triggers
- **Global setup & cleanup** to ensure stable and clean test runs

---

## 🧰 Tech Stack

- Playwright
- JavaScript / TypeScript
- Node.js
- Allure Reporter
- GitHub Actions

---

## 📦 Prerequisites

Ensure the following are installed on your machine:

- **Node.js** (v18 or higher recommended)
- **npm**
- **Git**

Verify installation:
```bash
node -v
npm -v
git --version

📥 Installation
1️⃣ Clone the Repository
git clone <repository-url>
cd <project-folder>

2️⃣ Install Dependencies
npm install

3️⃣ Install Playwright Browsers
npx playwright install

🔐 Environment Configuration (Mandatory)

This framework is fully environment-agnostic.
Application URLs and credentials are injected at runtime using environment variables.

Steps to Configure ENV Data

Create a folder named env in the project root.

Inside the env folder, create the file:

.env.demoQa

Required Variables (env/.env.demoQa)
BASE_URL=https://demoqa.com/
APP_USERNAME=your_username
APP_PASSWORD=your_password


⚠️ Important Notes

Do NOT commit .env files to version control

Ensure the env/ directory is listed in .gitignore

Tests will fail if ENV variables are missing

▶️ Running Tests

Use the following commands to execute tests in different modes.

Command	Description
npm test	Runs all tests in headless mode (default)
npm run test:chromium	Runs tests on Chromium browser only
npm run test:headed	Runs tests with browser UI visible (debug mode)
npm run allure:combine	Generates a single-file Allure HTML report
npm run allure:open	Opens the Allure report in default browser
npx playwright show-report	Opens the standard Playwright HTML report
📊 Reporting
Allure Report

Generated under .artifacts/allure-report

Supports single HTML file export

Easily shareable via email or Slack

No web server required to view

Playwright HTML Report

Generated automatically after test execution

Useful for quick local debugging and trace inspection

🧹 Global Setup & Cleanup

Before each test execution:

Old artifacts are removed automatically

Required directories are recreated

Prevents flaky results caused by stale data

⚙️ CI/CD Integration

Integrated with GitHub Actions

Supports manual execution using workflow_dispatch

Environment variables can be injected via GitHub Secrets

Same framework runs locally and in CI without code changes

📁 Project Structure (High Level)
├── env/
│   └── .env.demoQa
├── pages/
│   └── *.page.ts
├── tests/
│   └── *.spec.ts
├── testAssets/
│   └── artifacts/
├── playwright.config.ts
├── global-setup.ts
└── package.json

📌 Best Practices

Keep selectors inside Page Object classes only

Never hardcode credentials or URLs

Use headed mode for debugging failures

Clean artifacts before each run (handled automatically)

✅ Summary

This framework demonstrates industry-standard Playwright automation practices, making it suitable for:

Real-world enterprise projects

CI/CD pipelines

Automation portfolios

Interview demonstrations


---
