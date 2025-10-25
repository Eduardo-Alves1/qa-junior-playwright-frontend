import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';

let productPage;
let loginPage;

test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    loginPage = new LoginPage(page);
});

test.describe('Pagina de Produtos', () => {

    test('Deve adiconar produto no carrinho', async () => {
        await loginPage.visit();
        await loginPage.submitLoginForm('standard_user', 'secret_sauce');
        await productPage.verifyProductPage();
        await productPage.addProductsToCart(['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt', 'Test.allTheThings() T-Shirt (Red)']);
        await productPage.expectCartCount(3);
        
    })

    test('Deve remover produto do carrinho', async () => {
        await loginPage.visit();
        await loginPage.submitLoginForm('standard_user', 'secret_sauce');
        await productPage.verifyProductPage();
        await productPage.addProductsToCart(['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt', 'Test.allTheThings() T-Shirt (Red)']);
        await productPage.expectCartCount(3);
        await productPage.removeProductsFromCart(['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt']);
        await productPage.expectCartCount(1);
    })
});