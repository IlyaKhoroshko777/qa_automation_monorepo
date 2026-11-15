import { test, expect } from '@playwright/test';

import { generateRandomEmail, calculateDiscountedPrice } from '../helpers';

import { UserProfile, RecipeFixture } from '../types';

const isHeadless: boolean = true
const testTags: string[] = ['smoke' , 'regression']
// testTags.push(5)

function printUser(user: UserProfile): void{
    console.log(`${user.email}-${user.isActive} `);
}


test('functions', async ({ page }) => {
    const finalPrice:number = calculateDiscountedPrice(299, 10);
    console.log(finalPrice);
});

test('registration a new user', async ({ page }) => {
    const email:string = generateRandomEmail('user');
    console.log('Registration a new user:', email);
});

test('checking the discounted tariff price', async ({ page }) => {
    const finalPrice:number = calculateDiscountedPrice(499, 10);
    expect(finalPrice).toBe(449.1);
});

test('interface UserProfile',async ({page})=>{
    const user:UserProfile = { id: 1,email: 'qa@test.com',isActive:true};
    const testRecipe: RecipeFixture = {
        title:'Borch',
        category:'First'
    } 
    console.log(testRecipe)
        console.log(user.email);
    printUser({id:12,email:'test@test.com', isActive:true})
})