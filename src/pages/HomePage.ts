import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

/**
 * HomePage (Inventory page) after a successful login on Sauce Demo.
 */
export class HomePage extends BasePage {
  // Locators
  private readonly pageTitle: Locator;
  private readonly inventoryList: Locator;
  private readonly inventoryItems: Locator;
  private readonly shoppingCartBadge: Locator;
  private readonly shoppingCartLink: Locator;
  private readonly burgerMenuButton: Locator;
  private readonly logoutLink: Locator;
  private readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('[data-test="title"]');
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.burgerMenuButton = page.getByRole("button", { name: "Open Menu" });
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------

  async getPageTitleText(): Promise<string> {
    return this.getText(this.pageTitle);
  }

  async getInventoryItemCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  async addItemToCartByIndex(index: number): Promise<void> {
    const addButton = this.inventoryItems
      .nth(index)
      .locator("button", { hasText: "Add to cart" });
    await this.click(addButton);
  }

  async removeItemFromCartByIndex(index: number): Promise<void> {
    const removeButton = this.inventoryItems
      .nth(index)
      .locator("button", { hasText: "Remove" });
    await this.click(removeButton);
  }

  async getCartBadgeCount(): Promise<string> {
    return this.getText(this.shoppingCartBadge);
  }

  async openShoppingCart(): Promise<void> {
    await this.click(this.shoppingCartLink);
  }

  async sortBy(
    option: "az" | "za" | "lohi" | "hilo",
  ): Promise<void> {
    await this.selectOption(this.sortDropdown, option);
  }

  async logout(): Promise<void> {
    await this.click(this.burgerMenuButton);
    await this.click(this.logoutLink);
  }

  // ---------------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------------

  async expectHomePageLoaded(): Promise<void> {
    await this.expectToBeVisible(this.pageTitle);
    await this.expectToBeVisible(this.inventoryList);
    await this.expectToHaveURL(/inventory/);
  }

  async expectPageTitleText(expected: string): Promise<void> {
    await this.expectToHaveText(this.pageTitle, expected);
  }

  async expectCartBadge(expected: string): Promise<void> {
    await this.expectToHaveText(this.shoppingCartBadge, expected);
  }
}
