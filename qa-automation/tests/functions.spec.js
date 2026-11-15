import { test, expect } from '@playwright/test';

test('JS Advanced - Funtions', async ({ page }) => {
    const user = {
        username: 'john',
        role: 'admin',
        isActive: true,
        "full name":'John SilverHand',
        address:{
            country:'Ukraine',
            city:'Lviv',
            zip:'00001',
        },
        roles: ['admin', 'editor']
    }
    // console.log(user.username)
    // console.log(user['role'])
    // console.log(user['full name'])
    // console.log(user.address.country)
    // console.log(user.address.city)
    // console.log(user.roles['1'])
    const jsonString = JSON.stringify(user)
    console.log(jsonString)
    const userNew = JSON.parse(jsonString)
    console.log(userNew)
});