import { expect } from '@playwright/test';

export class ProductPage {
    constructor(page){
        this.page = page;
    }

    async verifyProductPage() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(/.*inventory/);
    }

    

    // Adiciona um ou vários produtos ao carrinho. Aceita string ou array de nomes.
    async addProductsToCart(products) {
        const list = Array.isArray(products) ? products : [products];
        for (const name of list) {
            const item = this.page.locator('.inventory_item').filter({ hasText: name });
            await item.getByRole('button', { name: /Add to cart/i }).click();
        }
    }

    // Retorna o contador atual do carrinho. Se não houver badge visível, considera 0.
    async getCartCount() {
        const badge = this.page.locator('[data-test=shopping-cart-badge]');
        if (await badge.count() === 0) return 0;
        const text = await badge.textContent();
        return Number(text || 0);
    }

    // Verifica que o contador do carrinho é igual ao esperado.
    async expectCartCount(expected) {
        await this.page.waitForLoadState('networkidle');
        const count = await this.getCartCount();
        expect(count).toBe(expected);
    }

    // Remove um ou vários produtos do carrinho. Aceita string ou array de nomes.
    async removeProductsFromCart(products) {
        const list = Array.isArray(products) ? products : [products];
        for (const name of list) {
            const item = this.page.locator('.inventory_item').filter({ hasText: name });
            await item.getByRole('button', { name: /Remove/i }).click();
        }
    }
}