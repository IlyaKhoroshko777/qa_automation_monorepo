import { test, expect } from "@playwright/test";

test.describe("Search for a recipes", () => {
    test.beforeAll(async () => {
        // один раз перед усіма тестами в групи
        // наприклад підготовка даних через API
        console.log('before all')
    });
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/auth/login");
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeEnabled();
    await page.locator("#email").fill("goit@gmail.com");
    await page.locator("#password").fill("Foodies2025!");
    await expect(page.locator("#email")).toHaveValue("goit@gmail.com");
    await expect(page.locator("#password")).toHaveValue("Foodies2025!");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Invalid credentials")).not.toBeVisible();
    await expect(page).toHaveURL("http://localhost:5173");
    await expect(page).not.toHaveURL("http://localhost:5173/auth/login");
  });
  test.afterEach(async ({ page }, testInfo) => {
    // діагностика: статус і адреса після тесту
    console.log(`Test "${testInfo.title}": ${testInfo.status}`);
    console.log(`Page: ${page.url()}`);
  });
  test.afterAll(async () => {
    // один раз після всіх тестів групи
    console.log('after all')
  })

  test("card recipes to be visible", async ({ page }) => {
    await expect(page.getByRole("article").first()).toBeVisible();
    const count = await page.getByRole("article").count();
    expect(count).toBeGreaterThan(0);
  });

  test("Search for a recipe by name", async ({ page }) => {
    await page.getByPlaceholder("Search recipes").fill("avocado");
    await page.getByPlaceholder("Search recipes").press("Enter");

    await expect(page.getByRole("article").first()).toBeVisible();
    await expect(page.getByRole("article").first()).toContainText("avocado");
  });
});
