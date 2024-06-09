import { test, expect } from "@playwright/test";
import HomePage from "../page_objects/homePage.js";
import { BASE_URL,
  EXISTING_USER_DATA,
  HOME_PAGE_TITLE,
  LOGIN_PAGE_EMPTY_FIELD_ERROR_MESSAGE,
  LOGIN_PAGE_END_POINT,
  LOGIN_PAGE_FIELDS,
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

  test("Verify that user can sign in with valid credentials", async ({ page }) => {
    let homePage = new HomePage(page);
    const loginPage = await homePage.clickSignInLink();

    await loginPage.fillEmailField(EXISTING_USER_DATA.email);
    await loginPage.fillPasswordField(EXISTING_USER_DATA.password);
    homePage = await loginPage.clickSignInButton();

    await expect(page).toHaveURL(BASE_URL);
    await expect(homePage.locators.getWelcomeMessage()).toHaveText(EXISTING_USER_DATA.welcomeMessage);
    await expect(page).toHaveTitle(HOME_PAGE_TITLE);
  });

  LOGIN_PAGE_FIELDS.forEach(fieldName => {
    test(`Verify that user can't sign in with empty "${fieldName}" field, error message appears`, async ({ page }) => {
      const homePage = new HomePage(page);
      const loginPage = await homePage.clickSignInLink();

      fieldName === "Email" ? null : await loginPage.fillEmailField(EXISTING_USER_DATA.email);
      fieldName === "Password" ? null : await loginPage.fillPasswordField(EXISTING_USER_DATA.password);
      await loginPage.clickSignInButton();

      await expect(page).toHaveURL(BASE_URL + LOGIN_PAGE_END_POINT);
      await expect(loginPage.locators.getPageHeader()).toHaveText(LOGIN_PAGE_HEADER);
      await expect(loginPage.locators.getFieldErrorMessage(fieldName)).toBeVisible();
      await expect(loginPage.locators.getFieldErrorMessage(fieldName)).toHaveText(LOGIN_PAGE_EMPTY_FIELD_ERROR_MESSAGE);
    });
  });
})