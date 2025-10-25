import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/productPage';

let loginPage;
let productPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);

});

test.describe('Login Page', () => {
    test('Deve abrir a pagina de incial de login', async () => {
        await loginPage.visit();
    });

    test('Deve fazer Login com Sucesso', async () =>{
        await loginPage.visit();
        await loginPage.submitLoginForm('standard_user', 'secret_sauce');
        await productPage.verifyProductPage();
    })

    test('Deve fazer Login com Falha', async () =>{
        await loginPage.visit();
        await loginPage.submitLoginForm('locked_out_user', 'secret_sauce');
        await loginPage.expectLoginError();
    })
});