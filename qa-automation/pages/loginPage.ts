import {Locator, Page} from '@playwright/test'

interface LoginPageInterface{
    emailInput: string;
    password: string;
    loginButton: Locator;
    page:Page;
    login(email:string,passowrd:string): Promise<void>
}

export class LoginPage implements LoginPageInterface{
    emailInput:string;
    password:string;
    loginButton:Locator;
    page: Page

    constructor(page: Page) {
        this.page = page;
        this.emailInput = '#email'
        this.password = '#password'
        this.loginButton = page.locator('button[type="submit"]')
    }
    #fillField(selector:string, value:string){
        return this.page.fill(selector, value)
    }
    async login(email:string , password:string):Promise<void> {
        await this.#fillField(this.emailInput, email)
        await this.#fillField(this.password, password)
        await this.loginButton.click()
        // await this.page.fill(this.emailInput, email);
        // await this.page.fill(this.password, password);
        // await this.page.click(this.loginButton)
    }
}