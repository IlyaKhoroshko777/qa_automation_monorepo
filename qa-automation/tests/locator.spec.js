import { test, expect } from '@playwright/test';
test('locators in practice', async ({ page }) => {
    await page.goto('http://localhost:5173/')
     await expect(page.getByRole('article').locator('button')).toBeVisible();
    // await expect(page.getByRole('article').filter({hasText: 'Croatian Bean Stew'})).toBeVisible();
});

test('login page', async ({ page }) => {
    await page.goto('http://localhost:5173/auth/login')
    await page.locator('#email').fill('goit@gmail.com')
    await page.locator('#password').fill('Foodies2025!')
    // await page.locator('button[type="submit"]').click();
    await page.getByRole('button',{ name: 'Login'}).click(); // так ось це я сам написав додумався, 
    // а ось це те що в відео було,я так поняв те що в відео краще бо воно по типу sumbit а в мене по ролу кнопка імя має login
    // Гірше виходе? бо він стабільніший за мій
});

test('full combo', async ({ page }) => {
    await page.goto('http://localhost:5173/auth/login');
    await page.locator('#email').fill('goitkappa@gmail.com');
    await page.locator('#password').fill('1234567');
    // await page.locator('button[aria-label="Show password"]').click();
    await page.getByRole('button', { name: 'Show password' }).click(); // оце також я спочатку написав,потім змінив
    // коли побачив кращій варіант
    // await page.locator('button[type="submit"]').click();
    await page.getByRole('button', { name: 'Login'}).click(); // оце також я спочатку написав
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.getByText('BadRequestError')).toBeVisible();
    await expect(page.locator('#email')).toHaveValue('goitkappa@gmail.com')
    await expect(page.locator('#password')).toHaveAttribute('type', 'text');
    await expect(page.locator('#password')).toHaveValue('1234567');
});

test('login test page', async ({ page }) => {
    await page.goto('http://localhost:5173/auth/login')
    await page.locator('#email').fill('goit@gmail.com')
    await page.locator('#password').fill('Foodies2025!')
    await page.getByRole('button',{ name: 'Login'}).click(); 
});