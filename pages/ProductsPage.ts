import {Page, Locator} from '@playwright/test';

export class ProductsPage {

    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchResults: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        this.searchResults = page.locator('.productinfo p');
    }

    async search(term: string) {
        await this.searchInput.fill(term);
        await this.searchButton.click();
    }
}