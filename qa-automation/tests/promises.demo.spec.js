import { test, expect } from '@playwright/test';

test('JS promise', async ({page})=>{
    const delay = (ms) => new Promise((resolve) => {
        setTimeout(() => resolve('finish'), ms)
    })
    await delay(2000)
     .then((result) => console.log(result))
     .catch((error) => console.log(error))
     .finally(() => console.log('request completed'))
    console.log('code continue to work,but not wait a promise')
})

test('JS promise - practice', async ({page}) => {
    const fetchUser = (ms) => new Promise((resolve) => {
        setTimeout(() => resolve({ id:1,name: 'Alex'}), 1000)
    })
    await fetchUser().then((user)=>{
        console.log(user)
    }).catch((error) => console.log(error))
})