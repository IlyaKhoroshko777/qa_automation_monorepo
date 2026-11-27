import { test, expect } from "@playwright/test";
import path from "path";
import { LoginPage } from "../pageObjects/LoginPage";
import { AddRecipePage } from "../pageObjects/AddRecipePage";
import { DEFAULT_USER } from "../data/test-user";
import { RecipeCategory } from "../types/enums";
import { RecipeFixture } from "../types/fixtures";

const RECIPE_DETAILS_PATH_PREFIX = "/recipes/";

const testRecipe: RecipeFixture = {
  title: `Test recipe${Date.now()}`,
  description: "A tasty recipe created by an automated test",
  time: "30",
  calories: "250",
  category: RecipeCategory.Dessert,
  ingredientName: "Squid",
  ingredientAmount: "200g",
  instructions: "Mix everything together and cook for 30 minutes",
};

test.describe("Додавання рецепта", () => {
  let addRecipePage: AddRecipePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    addRecipePage = new AddRecipePage(page);

    await loginPage.open();
    await loginPage.login(DEFAULT_USER.email, DEFAULT_USER.password);
    await expect(page).toHaveURL("http://localhost:5173/");
    await addRecipePage.open();
  });

  test("успішне створення рецепта з усіма полями", async ({ page }) => {
    await addRecipePage.uploadPhoto(
      path.join(__dirname, "..", "data", "test-photo.png"),
    );
    await addRecipePage.fillTitle(testRecipe.title);
    await addRecipePage.fillDescription(testRecipe.description);
    await addRecipePage.fillTime(testRecipe.time);
    await addRecipePage.fillCalories(testRecipe.calories);
    await addRecipePage.selectCategory(testRecipe.category);
    await addRecipePage.addIngredient(
      testRecipe.ingredientName,
      testRecipe.ingredientAmount,
    );
    await addRecipePage.fillInstructions(testRecipe.instructions);
    await expect(addRecipePage.ingredientRows).toHaveCount(1);
    await expect(addRecipePage.ingredientRows.first()).toContainText(
      testRecipe.ingredientName,
    );
    await expect(addRecipePage.ingredientRows.first()).toContainText(
      testRecipe.ingredientAmount,
    );
    await addRecipePage.submit();
    await expect(addRecipePage.successToast).toBeVisible();
    await expect(page).toHaveURL((url) =>
      url.pathname.startsWith(RECIPE_DETAILS_PATH_PREFIX),
    );
  });
});
