import { test, expect, type Page } from "@playwright/test";

// Every test intercepts /api/quote so no real lead is ever created.

async function fillHomeForm(page: Page) {
  await page.locator("#home-name").fill("E2E Tester");
  await page.locator("#home-email").fill("e2e@example.com");
  await page.locator("#home-message").fill("Koffie voor 80 gasten graag.");
}

test("home form shows an error instead of a false thank-you when delivery fails", async ({
  page,
}) => {
  await page.route("**/api/quote", (route) =>
    route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({ ok: false, error: "delivery_failed" }),
    }),
  );
  await page.goto("/nl");
  await fillHomeForm(page);
  await page.locator("form:has(#home-name) button[type=submit]").click();

  await expect(page.locator("form:has(#home-name)").getByRole("alert")).toContainText(
    "hello@branded-baristas.com",
  );
  await expect(page.locator("#home-name")).toBeVisible();
});

test("home form sends the spam signals and UTM, then reports generate_lead", async ({ page }) => {
  let payload: Record<string, unknown> | null = null;
  await page.route("**/api/quote", async (route) => {
    payload = route.request().postDataJSON() as Record<string, unknown>;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });
  await page.goto("/nl?utm_source=e2e&utm_medium=test&utm_campaign=home-check");
  await fillHomeForm(page);
  await page.locator("form:has(#home-name) button[type=submit]").click();

  await expect(page.getByRole("status")).toBeVisible();

  const body = payload as unknown as Record<string, unknown>;
  expect(body.source).toBe("home");
  expect(body.utm_campaign).toBe("home-check");
  expect(body.bb_hp).toBe("");
  expect(typeof body.bb_elapsed).toBe("number");

  const leadEvents = await page.evaluate(() =>
    (window.dataLayer ?? [])
      .map((entry) => Array.from(entry as ArrayLike<unknown>))
      .filter((args) => args[0] === "event" && args[1] === "generate_lead"),
  );
  expect(leadEvents).toEqual([["event", "generate_lead", { lead_source: "home" }]]);
});

test("honeypot field is invisible and out of the tab order", async ({ page }) => {
  await page.goto("/nl/offerte");
  const honeypot = page.locator('input[name="bb_hp"]');
  await expect(honeypot).toHaveCount(1);
  await expect(honeypot).toHaveAttribute("tabindex", "-1");
  const box = await honeypot.boundingBox();
  expect(box === null || box.x + box.width < 0).toBe(true);
});
