import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Login', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page, 'Should redirect to inventory').toHaveURL(/inventory/);
  });

   test('unseccessful login with invalid credentials', async ({page}) => {
    const loginPage=new LoginPage(page);
    await loginPage.login('ivalid_user','invalid_password');
    await expect(loginPage.errorMessage,'invalid credentials').toBeVisible();
  });

 test('empty fields', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage, 'empty fields').toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username is required');

 });

 test.describe('Inventory', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  test('add product to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('sauce-labs-backpack');
    await expect(
      inventoryPage.cartBadge,
      'Cart badge should show 1'
    ).toHaveText('1');
  });

});

});