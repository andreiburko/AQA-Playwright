import { test, expect } from "@playwright/test";
import HomePage from "../page_objects/homePage.js";
import { BASE_URL,
  LOGIN_PAGE_END_POINT,
  LOGIN_PAGE_HEADER } from "../helpers/testData.js";

test.describe("loginPage.spec", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
  });

  test('Check redirecting to "Customer Login" page after click on "Sign In" link', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = await homePage.clickSignInLink();

    await expect(page).toHaveURL(BASE_URL + LOGIN_PAGE_END_POINT);
    await expect(page).toHaveTitle(LOGIN_PAGE_HEADER);
    await expect(loginPage.locators.getPageHeader()).toHaveText(LOGIN_PAGE_HEADER);
  });
})