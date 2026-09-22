import {Page, Locator} from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly cartBadge: Locator;
    readonly cartIcon: Locator;
    readonly sortDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    }   

    async addToCart(productName: string) {
         await this.page.locator(`[data-test="add-to-cart-${productName}"]`).click();
  }

  async openCart() {
    await this.cartIcon.click();
  
    }
}