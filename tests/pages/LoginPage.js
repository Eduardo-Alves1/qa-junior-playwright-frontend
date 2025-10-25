// Página de Login (Page Object)
// Esta classe agrupa ações comuns da tela de login para deixar os testes mais claros e fáceis de manter.
import { expect } from '@playwright/test';

export class LoginPage {
    // Guarda a instância de Page do Playwright para reutilizar nas ações da tela.
    constructor(page){
        this.page = page;
    }

    // Navega para a página inicial e valida que o formulário de login está visível.
    async visit() {
        await this.page.goto('/');
        const loginForm = this.page.locator('.login-box');
        await expect(loginForm).toBeVisible();
    }

    // Preenche usuário e senha e envia o formulário de login.
    // Obs.: os seletores usam o atributo data-test para dar estabilidade aos testes.
    async submitLoginForm(username, password) {
        await this.page.locator('data-test=username').fill(username); // campo de usuário
        await this.page.locator('data-test=password').fill(password); // campo de senha
        await this.page.locator('data-test=login-button').click(); // botão "Login"
        
    }

    // Valida que a mensagem/alerta de erro é exibida após tentativa de login inválida.
    async expectLoginError() {
        const alert = this.page.locator('data-test=error'); // área/alerta de erro
        await expect(alert).toBeVisible({timeout: 5000}); // aguarda até 5s para aparecer
    }
}
