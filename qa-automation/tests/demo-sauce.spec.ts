import {test , expect} from '@playwright/test';
import { login } from '../helpers/sauceLogin';
import { ProductAddButton } from '../types/enums';
import { addProductToCart, removeProductFromBacket } from '../helpers/sauceCart';
import { RemoveProductAddButton } from '../types/enums';

test.describe('Login page test demo',()=>{
test.beforeEach(async ({page})=>{
    await page.goto('https://www.saucedemo.com/')
    await expect(page).toHaveURL('https://www.saucedemo.com/')
})
    test('user can fiil in username field', async ({page})=>{
        await expect(page.locator('[data-test="username"]')).toBeVisible()
        await page.locator('[data-test="username"]').fill('standard_user')
        await expect(page.locator('[data-test="username"]')).toHaveValue('standard_user')
    })
    test('user can fill in password field', async ({page})=>{
        await expect(page.locator('[data-test="password"]')).toBeVisible()
        await page.locator('[data-test="password"]').fill('secret_sauce')
        await expect(page.locator('[data-test="password"]')).toHaveValue('secret_sauce')
    })
    test('user can click on the button "Login"', async ({page})=>{
        await expect(page.locator('[data-test="login-button"]')).toBeEnabled()
        await page.locator('[data-test="login-button"]').click()
        await expect(page.locator('[data-test="error"]')).toBeVisible()
        await expect(page.getByRole('form', { name: 'Login' })
        .locator('div')
        .filter({ hasText: /^Epic sadface: Username is required$/ })).toBeVisible()
    })
    test('user can close error message',async({page})=>{
        await expect(page.locator('[data-test="login-button"]')).toBeEnabled()
        await page.locator('[data-test="login-button"]').click()
        await expect(page.locator('[data-test="error"]')).toBeVisible()
        await page.locator('[data-test="error-button"]').click()
        await expect(page.locator('[data-test="error"]')).not.toBeVisible()
    })
});
test.describe('Login with valid and invalid data',()=>{
    test.beforeEach(async ({page})=>{
        await page.goto('https://www.saucedemo.com/')
        await expect(page).toHaveURL('https://www.saucedemo.com/')
        await expect(page.locator('[data-test="username"]')).toBeVisible()
        await expect(page.locator('[data-test="password"]')).toBeVisible()
        await expect(page.locator('[data-test="login-button"]')).toBeEnabled()
    });

test('user can log in with valid data',async({page})=>{
    await login(page,'standard_user','secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
});

test('user cant log in with invalid username',async ({page})=>{
    await login(page,'standarduser','secret_sauce')
    await expect(page.locator('[data-test="error"]')).toBeVisible()
});

test('user cant log in with invalid password',async ({page})=>{
    await login(page,'standard_user','secretsauce')
    await expect(page.locator('[data-test="error"]')).toBeVisible()
});

test('user cant log in with empty both fields',async ({page})=>{
    await expect(page.locator('[data-test="username"]')).toBeEmpty()
    await expect(page.locator('[data-test="password"]')).toBeEmpty()
    await expect(page.locator('[data-test="login-button"]')).toBeEnabled()
    await page.locator('[data-test="login-button"]').click()
    await expect(page.locator('[data-test="error"]')).toBeVisible()
});

});
test.describe('User can add to cart and more',()=>{
    test.beforeEach(async ({page})=>{
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('[data-test="username"]')).toBeVisible();
        await expect(page.locator('[data-test="password"]')).toBeVisible();
        await expect(page.locator('[data-test="login-button"]')).toBeEnabled();
        await login(page,'standard_user','secret_sauce');
    });

    test('user can add to cart in basket backpack',async ({page})=>{
        await addProductToCart(page,ProductAddButton.Backpack)
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1')
        // console.log(ProductAddButton.Backpack)
    })

    test('user can add to cart in basket bikelight',async ({page})=>{
        await addProductToCart(page,ProductAddButton.BikeLight)
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1')
        // console.log(ProductAddButton.BikeLight)
    })

    test('user can add to cart in basket bolttshirt',async ({page})=>{
        await addProductToCart(page,ProductAddButton.BoltTShirt)
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1')
        // console.log(ProductAddButton.BoltTShirt)
    })
    test('user can add to cart in basket fleecejacket',async ({page})=>{
        await addProductToCart(page,ProductAddButton.FleeceJacket)
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1')
        // console.log(ProductAddButton.FleeceJacket)
    })
    test('user can add to cart in basket onesie',async ({page})=>{
        await addProductToCart(page,ProductAddButton.Onesie)
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1')
        // console.log(ProductAddButton.Onesie)
    })
    test('user can add to cart in basket redtshirt',async ({page})=>{
        await addProductToCart(page,ProductAddButton.RedTShirt)
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1')
        // console.log(ProductAddButton.RedTShirt)
    });

});
test.describe('User can remove product from backet',()=>{
    test.beforeEach(async ({page})=>{
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('[data-test="username"]')).toBeVisible();
        await expect(page.locator('[data-test="password"]')).toBeVisible();
        await expect(page.locator('[data-test="login-button"]')).toBeEnabled();
        await login(page,'standard_user','secret_sauce');
    });
    test('user can remove backpack from backet',async ({page})=>{
        await addProductToCart(page,ProductAddButton.Backpack)
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1')
        await removeProductFromBacket(page,RemoveProductAddButton.RemoveBackpack)
        await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible()
        // console.log(RemoveProductAddButton.RemoveBackpack)
    });
    test('user can remove bikelight from backet',async ({page})=>{
        await addProductToCart(page,ProductAddButton.BikeLight)
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1')
        await removeProductFromBacket(page,RemoveProductAddButton.RemoveBikeLight)
        await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible()
        // console.log(RemoveProductAddButton.RemoveBikeLight)
    });
    test('user can remove bolttshirt from backet', async ({ page }) => {
        await addProductToCart(page,ProductAddButton.BoltTShirt)
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1')
        await removeProductFromBacket(page, RemoveProductAddButton.RemoveBoltTShirt)
        await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible()
        // console.log(RemoveProductAddButton.RemoveBoltTShirt)
    });
    test('user can remove fleecejacket from backet', async ({ page }) => {
        await addProductToCart(page,ProductAddButton.FleeceJacket)
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1')
        await removeProductFromBacket(page, RemoveProductAddButton.RemoveFleeceJacket)
        await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible()
        // console.log(RemoveProductAddButton.RemoveFleeceJacket)
    });
    test('user can remove onesie from backet', async ({ page }) => {
        await addProductToCart(page,ProductAddButton.Onesie)
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1')
        await removeProductFromBacket(page, RemoveProductAddButton.RemoveOnesie)
        await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible()
        // console.log(RemoveProductAddButton.RemoveOnesie)
    });
    test('user can remove redtshirt from backet', async ({ page }) => {
        await addProductToCart(page,ProductAddButton.RedTShirt)
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1')
        await removeProductFromBacket(page, RemoveProductAddButton.RemoveRedTshirt)
        await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible()
        // console.log(RemoveProductAddButton.RemoveRedTshirt)
    });
})