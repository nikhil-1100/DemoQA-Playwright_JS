// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve('env/.env.demoQa')
});

export default defineConfig({
  globalSetup: './globalSetup.js',
  globalTeardown: './globalTeardown.js',

  testDir: './testAssets/tests',
  outputDir: './testAssets/artifacts/test-results',

 reporter: [
    ['html', { outputFolder: './testAssets/artifacts/playwright-report' }],
    ['allure-playwright', { resultsDir: './testAssets/artifacts/allure-results' }]
  ],

  timeout: 60_000,
  expect: { timeout: 15_000 },

  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,

  use: {
    actionTimeout: 15_000,
    navigationTimeout: 45_000,
    headless: false,
    viewport: null,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } }
  ]
});
