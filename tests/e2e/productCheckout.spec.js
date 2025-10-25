import { test } from '@playwright/test';
import { ProductCheckoutPage } from '../pages/ProductCheckoutPage';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from '../pages/LoginPage';

let productPage;
let checkoutPage;
let loginPage;
test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    checkoutPage = new ProductCheckoutPage(page);
    loginPage = new LoginPage(page);
});

test.describe('Steps para o Checkout', () => {

    test('Adiconando produtos ao carrinho', async ({ page }) => {

        await loginPage.visit();
        await loginPage.submitLoginForm('standard_user', 'secret_sauce');
        await productPage.addProductsToCart(['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt']);
        await checkoutPage.goToCart();
    });
    test('Deve preencher o formulário de checkout com dados válidos', async ({ page }) => {
        await loginPage.visit();
        await loginPage.submitLoginForm('standard_user', 'secret_sauce');
        await productPage.addProductsToCart(['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt']);
        await checkoutPage.goToCart();
        await checkoutPage.fillCheckoutForm('João', 'Silva', '12345-678');
    });

    test('Deve finalizar o checkout e verificar a confirmação', async ({ page }) => {
        await loginPage.visit();
        await loginPage.submitLoginForm('standard_user', 'secret_sauce');
        await productPage.addProductsToCart(['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt']);
        await checkoutPage.goToCart();
        await checkoutPage.fillCheckoutForm('João', 'Silva', '12345-678');
        await checkoutPage.finishCheckout();
    })
})