import { test, expect } from '@playwright/test';
// test('click button search', async ({ page }) => {
//     await page.goto('http://localhost:5173/');
//     // await page.getByRole('textbox', { name: 'Search recipes' }).fill('kappachungus cake');
//     await page.getByRole('button', { name: 'Search' }).dblclick();
//     await page.getByRole('article').nth(1).click({button: 'right'}) 
//     await page.getByRole('article').nth(1).click({modifiers: ['Control']})
//     await page.getByRole('article').nth(1).click({position:{
//         x: 100,
//         y: 100,
//     }})
//     // await expect(page.getByText('Sorry, no recipes match your search.')).toBeVisible();
// });

// test('Login page', async ({ page }) => {
//     await page.goto('http://localhost:5173/auth/login')
//     await page.locator('#email').fill('goit@gmail.com')
//     await page.locator('#password').fill('Foodies2025!')
//     await page.pause()
// });

// test('enter search request', async ({ page }) => {
//     await page.goto('http://localhost:5173/')
//     await page.getByPlaceholder('Search recipes').fill('avocado')
//     await page.getByPlaceholder('Search recipes').press('Enter')
//     await page.pause()
// });

// test('method checkbox demo', async ({ page }) => {
//     await page.goto('http://localhost:5173/auth/register');
//     await page.locator('#terms').check();
// });

// test('add img recipe', async ({ page }) => {
//     await page.goto('http://localhost:5173/auth/login');
//     await page.locator('#email').fill('goit@gmail.com')
//     await page.locator('#password').fill('Foodies2025!')
//     await page.getByRole('button', { name:'Login'}).click()
//     await page.locator('a[href="/add-recipe"]').click()
//     await page.locator('#photoInput').setInputFiles(['data/varenyyk.png'])
//     await expect(page.getByText('Login successful')).toBeVisible()
//     await page.pause()
// });

test('verify email visible', async ({ page }) => {
    await page.goto('http://localhost:5173/auth/login');
    await expect(page.locator('#email')).toBeVisible()
});
test('verify password visible', async ({ page }) => {
    await page.goto('http://localhost:5173/auth/login');
    await expect(page.locator('#password')).toBeVisible()
});
test('verify button "Login" visible', async ({ page }) => {
    await page.goto('http://localhost:5173/auth/login');
    await expect(page.getByRole('button',{name:'Login'})).toBeEnabled()
});

test('verify alert message when user log in the main menu', async ({ page }) => {
    await page.goto('http://localhost:5173/auth/login');
    await page.locator('#email').fill('goit@gmail.com')
    await page.locator('#password').fill('Foodies2025!')
    await page.getByRole('button', {name:'Login'}).click()
    await expect(page.getByText('Login successful')).toBeVisible()
});
test('when user log in the main menu,user have a profile', async ({ page }) => {
    await page.goto('http://localhost:5173/auth/login');
    await page.locator('#email').fill('goit@gmail.com')
    await page.locator('#password').fill('Foodies2025!')
    await page.getByRole('button', {name:'Login'}).click()
    await expect(page.getByRole('link', { name: 'My Profile' })).toHaveText('My Profile')
});
test('when user log in the main menu,user can add recipe', async ({ page }) => {
    await page.goto('http://localhost:5173/auth/login');
    await page.locator('#email').fill('goit@gmail.com')
    await page.locator('#password').fill('Foodies2025!')
    await page.getByRole('button', {name:'Login'}).click()
    await expect(page.getByRole('link', { name: 'Add Recipe' })).toHaveText('Add Recipe')
});