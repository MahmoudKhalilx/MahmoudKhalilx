import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

/**
 * LoginPage encapsulates all interactions with the Sauce Demo login page.
 */
export class LoginPage extends BasePage {
  // Locators
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly logo: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.logo = page.locator(".login_logo");
  }

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------

  async open(): Promise<void> {
    await this.navigate("/");
    await this.waitForPageLoad();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async getErrorMessageText(): Promise<string> {
    return this.getText(this.errorMessage);
  }

  // ---------------------------------------------------------------------------
  // Assertions
  // ---------------------------------------------------------------------------

  async expectLoginPageLoaded(): Promise<void> {
    await this.expectToBeVisible(this.logo);
    await this.expectToBeVisible(this.usernameInput);
    await this.expectToBeVisible(this.loginButton);
  }

  async expectErrorMessageVisible(): Promise<void> {
    await this.expectToBeVisible(this.errorMessage);
  }

  async expectErrorMessageText(expectedText: string): Promise<void> {
    await this.expectToHaveText(this.errorMessage, expectedText);
  }
}
