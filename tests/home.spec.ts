import { test, expect } from "../src/fixtures/page-fixtures";
import { loadTestData } from "../src/utils/test-data";
import type { UserCredentials } from "../src/types";

const users = loadTestData<UserCredentials[]>("users.json");
const validUser = users.find((u) => u.username === "standard_user")!;

test.describe("Home Page (Inventory)", () => {
  test.beforeEach(async ({ loginPage, homePage }) => {
    await loginPage.open();
    await loginPage.login(validUser.username, validUser.password);
    await homePage.expectHomePageLoaded();
  });

  test("should display page title 'Products'", async ({ homePage }) => {
    await homePage.expectPageTitleText("Products");
  });

  test("should display 6 inventory items", async ({ homePage }) => {
    const count = await homePage.getInventoryItemCount();
    expect(count).toBe(6);
  });

  test("should add item to cart and show badge", async ({ homePage }) => {
    await homePage.addItemToCartByIndex(0);
    await homePage.expectCartBadge("1");
  });

  test("should remove item from cart", async ({ homePage }) => {
    await homePage.addItemToCartByIndex(0);
    await homePage.expectCartBadge("1");

    await homePage.removeItemFromCartByIndex(0);
    // Badge should disappear after removing the only item
    const url = await homePage.getCurrentUrl();
    expect(url).toContain("inventory");
  });

  test("should sort products by name Z-A", async ({ homePage }) => {
    await homePage.sortBy("za");
    const title = await homePage.getPageTitleText();
    expect(title).toBe("Products");
  });

  test("should logout successfully", async ({ homePage, loginPage }) => {
    await homePage.logout();
    await loginPage.expectLoginPageLoaded();
  });
});
