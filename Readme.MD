# Playwright Web Features

Test automation project built with **Playwright** and **TypeScript**, using the **Page Object Model (POM)**. It covers common web features on the practice site [the-internet.herokuapp.com](https://the-internet.herokuapp.com): JavaScript dialogs, file upload and file download.

## What is covered

| Feature | Page object | Test file | What is verified |
|---|---|---|---|
| JavaScript alerts, confirms and prompts | `pages/AlertsPage.ts` | `tests/alerts.spec.ts` | Dialog text, accept and dismiss behaviour, and the result message shown on the page |
| File upload | `pages/UploadPage.ts` | `tests/upload.spec.ts` | Successful upload (confirmation heading and uploaded file name) and the error shown when no file is chosen |
| File download | `pages/DownloadPage.ts` | `tests/download.spec.ts` | Suggested file name, download completed without failure, and the saved file exists and is not empty |

## Project structure

```
playwright-web-features/
├── pages/            # Page objects: locators and user actions
├── tests/            # Test specs: expected results and assertions
├── test-data/        # Files used as test input (e.g. the file to upload)
├── playwright.config.ts
└── package.json
```

## Design approach

- **Page Object Model:** one class per web page. Page classes hold locators and actions; test files hold the expected values and assertions.
- **Web-first assertions:** tests use `expect(locator)` assertions that retry automatically, instead of fixed waits.
- **Independent tests:** each test sets up its own page and does not depend on another test.
- **Dialog and download handling:** the listener for the dialog or download event is registered before the action that triggers it.

## Prerequisites

- [Node.js](https://nodejs.org) (LTS version)
- Git

## Setup

```bash
git clone https://github.com/<your-username>/playwright-web-features.git
cd playwright-web-features
npm install
npx playwright install
```

## Running the tests

```bash
# Run all tests
npx playwright test

# Run one test file
npx playwright test alerts

# Watch the browser while tests run
npx playwright test --headed

# Debug visually with Playwright UI mode
npx playwright test --ui

# Open the HTML report from the last run
npx playwright show-report
```

## Notes

- The tests run against a public practice website, so they depend on that site being available. If a test fails on page load, check the site in your browser and try again.
- The download test saves files into Playwright's per-test output folder, so nothing is written to the project directory.

## Tech stack

- Playwright
- TypeScript
- Node.js

## Author

Salma