// @ts-check
import { defineConfig } from "@playwright/test";
require('dotenv').config();

export default defineConfig({
  testDir: "./tests",
  retries: 0,
  workers: 1,
  timeout: 250 * 1000,
  expect: {
    timeout: 60000,
  },
  reporter: [
    ["html", { open: "never" }],
    ["list"],
    ["allure-playwright", { outputFolder: "allure-results", detail: true, suiteTitle: true }],
  ],
  projects: [
    {
      name: "testcases_regression",
      testMatch: ["tests/UI Test/**/*.spec.js", "tests/API Test/**/*.spec.js"],
      use: {
        browserName: "chromium",
        headless: true,
        screenshot: "on",
        video: {
          mode: "retain-on-failure",
          size: { width: 1280, height: 720 },
        },
        ignoreHttpsErrors: true,
        viewport: { width: 1440, height: 900 },
        trace: "retain-on-failure",
        launchOptions: {
          slowMo: 300,
        },
      },
    },
  ],
});
