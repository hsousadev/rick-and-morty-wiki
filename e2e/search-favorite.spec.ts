import { expect, test } from "@playwright/test";

test("search opens a character and favorites it", async ({ page }) => {
  await page.goto("/");
  await page.locator("#search").fill("Rick Sanchez");
  await page.getByRole("option").filter({ hasText: "Rick Sanchez" }).first().click();
  await page.waitForURL("**/character/**", { timeout: 30_000 });
  await expect(page.getByRole("heading", { name: /Rick Sanchez/i })).toBeVisible({
    timeout: 30_000,
  });
  await page.getByRole("button", { name: "Adicionar aos favoritos" }).first().click();
  await page.goto("/favorites");
  await expect(page.getByText("Rick Sanchez").first()).toBeVisible();
});
