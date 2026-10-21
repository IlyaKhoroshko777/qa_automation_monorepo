import { test, expect } from '@playwright/test';

test.describe('Вхід у Tasteorama', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/auth/login');
  });

  test('успішний вхід переводить на головну сторінку', async ({ page }) => {
    const emailField = page.locator('#email');
    const passwordField = page.locator('#password');
    const submitButton = page.locator('button[type="submit"]');

    await emailField.fill(process.env.TEST_EMAIL);
    await passwordField.fill(process.env.TEST_PASSWORD);
    await submitButton.click();

    await expect(page).toHaveURL('http://localhost:5173/');
  });
  test('неправильний пароль показує помилку та не переводить на головну', async ({ page }) => {
    await page.locator('#email').fill('goit@gmail.com');
    await page.locator('#password').fill('Foodies2026!');
    await page.locator('button[type="submit"]').click();
    // Текст помилки статичний,тому перевіряємо точний збіг за допомогою toHaveText
    await expect(page.getByRole('alert')).toHaveText('UnauthorizedError');
    await expect(page).toHaveURL('http://localhost:5173/auth/login');
  });
});

test.describe('found article', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/');
    });

    test('first card, recipe list visible', async ({ page }) => {
        // Використовую first(), бо вимога тесту стосується саме першої картки
        await expect(page.getByRole('article').first()).toBeVisible();
        // додав tobevisible() щоб дочекатися появи карток перед миттєвим count(), бо сторінка може не підгрузитися
        const count = await page.getByRole('article').count();
        expect(count).toBeGreaterThan(0);
    });

    test('reset filters changes state after filter selection', async ({ page }) => {
        // [type="button"] знаходить 2 кнопки, тому використовую getByRole з унікальним accessible name
        await page.getByRole('button', { name: 'Filters' }).click()
        await expect(page.getByRole('button', { name: 'Reset filters'})).toBeDisabled()
        await page.getByText('Category').click()
        await page.getByRole('option', { name: 'Beef' }).click()
        // await expect(page.locator('div').filter({ hasText: /^Beef$/ }).first()).toHaveText('Beef')
        await expect(page.getByRole('button', { name: 'Reset filters'})).toBeEnabled()

        // await page.getByRole('button',{name:'Reset filters'}).click()
        // await page.getByRole('button', { name: 'Filters' }).click()
        // await expect(page.getByRole('button', { name: 'Reset filters'})).toBeDisabled()
        // await expect(page.getByText('Category')).toHaveText('Category')
    })
    test('previous page button enables after next page', async ({ page }) => {
        await expect(page.getByRole('button', {name:'previous page'})).toBeDisabled();
        await page.getByRole('button', {name:'2'}).click();
        await expect(page.getByRole('button',{name:'previous page'})).toBeEnabled();
    });
});
