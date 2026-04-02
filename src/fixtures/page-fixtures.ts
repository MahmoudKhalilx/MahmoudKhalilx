import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

/**
 * Custom test fixtures that inject page objects into every test.
 * Usage:
 *   import { test, expect } from "../src/fixtures/page-fixtures";
 *   test("my test", async ({ loginPage, homePage }) => { ... });
 */

type PageFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect } from "@playwright/test";
