import { test, expect } from '@playwright/test';
test.describe('Login',()=>{
test.beforeEach(async ({page}) =>{
    await page.goto('https://travel-stories-frontend.vercel.app/auth/login')
})
test('user can log in', async ({ page }) => {
    await page.locator('input[name="email"]').fill('ivan.ivanko@gmail.com')
    await page.locator('input[name="password"]').fill('ivanivanko')
    await page.getByRole('button', {name:'Увійти'}).click()
    await expect(page).toHaveURL('https://travel-stories-frontend.vercel.app/auth/login')
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toHaveValue('ivan.ivanko@gmail.com')
    await expect(page.locator('input[name="password"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toHaveValue('ivanivanko')
    await expect(page.getByRole('button', {name:'Увійти'})).toBeEnabled()
    await expect(page).toHaveURL('https://travel-stories-frontend.vercel.app/')
});
})

test.describe('Profile',()=>{
test.beforeAll(async () => {
    console.log
})
test.beforeEach(async ({page}) =>{
    await page.goto('https://travel-stories-frontend.vercel.app/auth/login')
    await page.locator('input[name="email"]').fill('ivan.ivanko@gmail.com')
    await page.locator('input[name="password"]').fill('ivanivanko')
    await page.getByRole('button', {name:'Увійти'}).click()
})
test('user log in and have his profile', async({page})=>{
    await expect(page).toHaveURL('https://travel-stories-frontend.vercel.app/')
    await page.getByRole('button', { name: 'Відкрити меню' }).click()
    await expect(page.locator('a').filter({ hasText: 'Іван Іванко' })).toBeVisible()
})

})