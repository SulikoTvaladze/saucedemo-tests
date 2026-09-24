import { expect, test } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';

test.describe('Product search', () => {
  test('user can search for a product and see relevant results', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');
    const productsPage = new ProductsPage(page);
    await productsPage.search('Blue Top');
    await expect(productsPage.searchResults.first(), 'Search results should be visible').toBeVisible();
    await expect(productsPage.searchResults.first(), 'Search results should contain Blue Top').toContainText('Blue Top');
  });
});

test.describe('Product details', () => {
  test('user can open product details and verify name price availability', async ({ page }) => {
    const productDetailPage = new ProductDetailPage(page);
    await productDetailPage.open(1);
    await expect(productDetailPage.productName, 'Product name should be visible').toBeVisible();
    await expect(productDetailPage.productPrice, 'Product price should be visible').toBeVisible();
    await expect(productDetailPage.productAvailability, 'Product availability should be visible').toBeVisible();
  });
});

test.describe('Cart', () => {
  test('user can add multiple products to cart and verify price quantity total', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');
    await page.locator('[data-product-id="1"]').first().click();
    await page.locator('.modal-footer button').click();
    await page.locator('[data-product-id="2"]').first().click();
    await page.locator('.modal-footer button').click();
    const cartPage = new CartPage(page);
    await cartPage.open();
    await expect(cartPage.cartItems, 'Cart should have 2 items').toHaveCount(2);
    await expect(cartPage.productPrices.first(), 'Price should be visible').toBeVisible();
    await expect(cartPage.productQuantities.first(), 'Quantity should be visible').toBeVisible();
    await expect(cartPage.productTotals.first(), 'Total should be visible').toBeVisible();
  });

  test('user can remove a product from cart', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');
    await page.locator('[data-product-id="1"]').first().click();
    await page.locator('.modal-footer button').click();
    const cartPage = new CartPage(page);
    await cartPage.open();
    await expect(cartPage.cartItems, 'Cart should have 1 item').toHaveCount(1);
    await page.locator('.cart_delete a').click();
    await expect(cartPage.cartItems, 'Cart should be empty after removing product').toHaveCount(0);
  });
});

test.describe('Contact form', () => {
  test('user can submit contact form with file upload', async ({ page }) => {
    await page.goto('https://automationexercise.com/contact_us');
    await page.locator('[data-qa="name"]').fill('John Doe');
    await page.locator('[data-qa="email"]').fill('john@test.com');
    await page.locator('[data-qa="subject"]').fill('Test Subject');
    await page.locator('[data-qa="message"]').fill('This is a test message');
    await page.locator('input[name="upload_file"]').setInputFiles({
      name: 'test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Test file content')
    });
    page.on('dialog', dialog => dialog.accept());
    await page.locator('[data-qa="submit-button"]').click();
    await expect(page.locator('.status.alert.alert-success'), 'Success message should be visible').toBeVisible();
  });
});