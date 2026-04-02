import { test, expect } from "../src/fixtures/page-fixtures";
import { loadTestData } from "../src/utils/test-data";
import type { UserCredentials } from "../src/types";

const users = loadTestData<UserCredentials[]>("users.json");
const validUser = users.find((u) => u.username === "standard_user")!;
const lockedUser = users.find((u) => u.username === "locked_out_user")!;

test.describe("Login Page", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test("should display login page elements", async ({ loginPage }) => {
    await loginPage.expectLoginPageLoaded();
  });

  test("should login successfully with valid credentials", async ({
    loginPage,
    homePage,
  }) => {
    await loginPage.login(validUser.username, validUser.password);
    await homePage.expectHomePageLoaded();
  });

  test("should show error for locked-out user", async ({ loginPage }) => {
    await loginPage.login(lockedUser.username, lockedUser.password);
    await loginPage.expectErrorMessageVisible();
    await loginPage.expectErrorMessageText(
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });

  test("should show error for invalid credentials", async ({ loginPage }) => {
    await loginPage.login("invalid_user", "wrong_password");
    await loginPage.expectErrorMessageVisible();
    await loginPage.expectErrorMessageText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });

  test("should show error when username is empty", async ({ loginPage }) => {
    await loginPage.login("", "secret_sauce");
    await loginPage.expectErrorMessageText("Epic sadface: Username is required");
  });

  test("should show error when password is empty", async ({ loginPage }) => {
    await loginPage.login("standard_user", "");
    await loginPage.expectErrorMessageText("Epic sadface: Password is required");
  });
});
