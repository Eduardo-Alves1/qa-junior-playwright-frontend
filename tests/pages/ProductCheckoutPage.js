import { expect } from '@playwright/test';

export class ProductCheckoutPage {
    constructor(page) {
        this.page = page;
    }

    async goToCart() {
        const cartLink = this.page.locator('[data-test="shopping-cart-link"]');
        await cartLink.click();
        await expect(this.page.locator('[data-test="checkout"]')).toBeVisible({ timeout: 5000 });
    }

    async fillCheckoutForm(firstName, lastName, zipCode) {
        await this.page.locator('[data-test="checkout"]').click();
        await this.page.locator('[data-test="firstName"]').fill(firstName);
        await this.page.locator('[data-test="lastName"]').fill(lastName);
        await this.page.locator('[data-test="postalCode"]').fill(zipCode);
        await this.page.locator('[data-test="continue"]').click();
        await expect(this.page.getByText('Checkout: Overview')).toBeVisible({ timeout: 5000 });
    }

    async finishCheckout() {
        await this.page.locator('[data-test="finish"]').click();
        await expect(this.page.getByText('Thank you for your order!')).toBeVisible({ timeout: 5000 });
    }
}