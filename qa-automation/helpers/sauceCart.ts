import { Page } from '@playwright/test';
import { ProductAddButton } from '../types/enums';
import { RemoveProductAddButton } from '../types/enums';

export async function addProductToCart(
    page: Page,
    button: ProductAddButton
): Promise<void> {
    await page.locator(`[data-test="${button}"]`).click()
}
export async function removeProductFromBacket(
    page: Page,
    button: RemoveProductAddButton
): Promise<void> {
    await page.locator(`[data-test="${button}"]`).click()
}
