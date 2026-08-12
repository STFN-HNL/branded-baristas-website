import { test, expect } from "@playwright/test";

test("quote form submits with UTM attribution and shows success", async ({ page }) => {
  // Land with UTM params (captured in sessionStorage by UtmCapture).
  await page.goto("/nl?utm_source=e2e&utm_medium=test&utm_campaign=quote-check");
  await page.goto("/nl/offerte");

  // Intercept the API call so the e2e run never creates a real lead.
  let payload: Record<string, unknown> | null = null;
  await page.route("**/api/quote", async (route) => {
    payload = route.request().postDataJSON() as Record<string, unknown>;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.locator("#date").fill("2030-06-15");
  await page.locator("#guests").fill("120");
  await page.locator("#location").fill("Zoetermeer");
  await page.locator("#name").fill("E2E Tester");
  await page.locator("#email").fill("e2e@example.com");

  await page.getByRole("button", { name: "Offerte aanvragen" }).click();

  await expect(page.getByRole("status")).toBeVisible();

  expect(payload).not.toBeNull();
  const body = payload as unknown as Record<string, unknown>;
  expect(body.source).toBe("quote");
  expect(body.name).toBe("E2E Tester");
  expect(body.email).toBe("e2e@example.com");
  expect(body.date).toBe("2030-06-15");
  expect(body.utm_source).toBe("e2e");
  expect(body.utm_medium).toBe("test");
  expect(body.utm_campaign).toBe("quote-check");
});
