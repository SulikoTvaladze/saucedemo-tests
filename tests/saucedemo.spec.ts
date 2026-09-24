import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

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

 test('locked out user cannot login', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('locked_out_user','secret_sauce');
    await expect(loginPage.errorMessage,'locked out user').toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
  
  });

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

  test('add two products and verify badge count', async ({page}) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await expect(inventoryPage.cartBadge,'Cart badge should show 2').toHaveText('2');
  });

  test('user can remove one product and verify cart updates', async ({page}) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await expect(inventoryPage.cartBadge,'Cart badge should show 2').toHaveText('2');
    await inventoryPage.removeFromCart('sauce-labs-backpack'); 
    await expect(inventoryPage.cartBadge,'Cart badge should show 1').toHaveText('1');

  });

});

test.describe('Cart', () => {

test.beforeEach(async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);

});

test('user can complete checkout and see success message', async ({ page }) => {
const inventoryPage = new InventoryPage(page);
const checkoutPage = new CheckoutPage(page);
await inventoryPage.addToCart('sauce-labs-backpack');
await inventoryPage.openCart();
await checkoutPage.checkoutButton.click();
await checkoutPage.fillShipping('John', 'Doe', '12345');
await checkoutPage.continueButton.click();
await checkoutPage.finish();
await expect(checkoutPage.successMessage, 'Success message should be visible').toBeVisible();

 });

});
