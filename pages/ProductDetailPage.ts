import {Page, Locator} from '@playwright/test';

export class ProductDetailPage {

    readonly page: Page;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly productAvailability: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('.product-information h2');
        this.productPrice = page.locator('.product-information span span');
        this.productAvailability = page.locator('.product-information p').filter({ hasText: 'Availability' });
    }

    async open(productId: number) {
        await this.page.goto(`https://automationexercise.com/product_details/${productId}`);
    }
}
