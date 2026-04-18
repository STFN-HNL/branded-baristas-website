import { test, expect } from "@playwright/test";

test.skip("root path redirects to /nl and page loads", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.ok()).toBe(true);
  expect(page.url()).toContain("/nl");
});
