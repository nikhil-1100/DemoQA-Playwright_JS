// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Dynamically load the .env file if it exists (local dev)
// In CI, dotenv will simply find nothing and move on to system env variables
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

  // Let CI environment dictate retries
  retries: process.env.CI ? 2 : 0,

  use: {
    // ZERO HARDCODING: 
    // These will be populated by either your .env file or GitHub Secrets
    baseURL: process.env.BASE_URL, 
    actionTimeout: 15_000,
    navigationTimeout: 45_000,
    
    // Controlled via environment variable or default to headless in CI
    headless: process.env.CI ? true : false,
    
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