import { test, expect } from "@playwright/test";

test("root path redirects to /nl and page loads", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.ok()).toBe(true);
  expect(page.url()).toContain("/nl");
});

test("WordPress redirect returns 301 to /nl/...", async ({ request }) => {
  const response = await request.get("/coffee-concepts/piaggio-tuk-tuk", {
    maxRedirects: 0,
  });
  expect(response.status()).toBe(301);
  expect(response.headers()["location"]).toContain("/nl/diensten/events/piaggio-tuk-tuk");
});
