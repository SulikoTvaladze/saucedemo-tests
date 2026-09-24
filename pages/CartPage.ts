import { Page, Locator } from '@playwright/test';

export class CartPage {

    readonly page: Page;
    readonly cartItems: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly productQuantities: Locator;
    readonly productTotals: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('#cart_info_table tbody tr');
        this.productNames = page.locator('.cart_description h4 a');
        this.productPrices = page.locator('.cart_price p');
        this.productQuantities = page.locator('.cart_quantity button');
        this.productTotals = page.locator('.cart_total p');
    }

    async open() {
        await this.page.goto('https://automationexercise.com/view_cart');
    }

    async removeProduct(productName: string) {
        await this.page.locator('.cart_description h4 a')
            .filter({ hasText: productName })
            .locator('xpath=ancestor::tr')
            .locator('.cart_delete a')
            .click();
    }
}