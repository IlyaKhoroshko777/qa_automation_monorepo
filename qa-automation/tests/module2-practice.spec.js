import { test } from '@playwright/test';

test ('Test data for verifying login', async () => {
    const testEmails = ['test@example.com', 'user@example.com', '','user@example', 'userexample.com'];
    console.log(testEmails);
    testEmails.push('another@example.com');
    let checksPassed = 0; // let, because the counter value will change
    console.log(testEmails);
});

test('Checking the number of recipes found', async () => {
    const recipesFoundText = '12';  // імітація значення, зчитаного зі сторінки
    const recipesFound = Number(recipesFoundText);
    if (recipesFound === 0) {
        console.log('No recipes found.');
    } else if (recipesFound === 12) {
        console.log('The expected number of recipes was found.');
    } else {
        console.log('A different number of recipes was found.');
    }
    const recipeAuthor = null
    const authorName = recipeAuthor || 'Uknown Author';
    console.log(`Author: ${authorName}`);
});

test('Iterating through emails using continue and break', async () => {
    const testEmails = ['test@example.com', 'user@example.com', '', 'user@example', 'userexample.com','','another@example.com','just@example.com'];
    let checksPassed = 0;
    for (const email of testEmails) {
        if (email === '') {
            console.log('Empty email skipped');
            continue;
        }
        checksPassed = checksPassed + 1;
        console.log (`Checking email: ${email}, checks passed: ${checksPassed}`);
        if (email === 'another@example.com') {
            console.log('Found the email, breaking the loop.');
            break;
        }
    }
console.log(`Total checks passed: ${checksPassed}`);
});

test ('Reduction of cooking time through cycles', async () => {
    let cookingTime = 90;
    while (cookingTime >= 30) {
        cookingTime = cookingTime - 10; // decrease cooking time by 10 minutes
        console.log(`Cooking time: ${cookingTime} minutes`);
    }

    let cookingTimeDoWhile = 90;
    do {
         cookingTimeDoWhile = cookingTimeDoWhile - 10;
         console.log(`Cooking time after do while: ${cookingTimeDoWhile} minutes`);
    } while(cookingTimeDoWhile >= 30);
    // Якщо умова вже false на самому страті, то while не виконається, а do while все одно виконається один раз.
});