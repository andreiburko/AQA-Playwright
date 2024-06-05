import { test, expect } from "@playwright/test";
import HomePage from "../page_objects/homePage.js";
import { ACCOUNT_CREATED_SUCCESSFULLY_MESSAGE,
  BASE_URL, 
  CREATE_ACCOUNT_FORM_INPUTS, 
  CREATE_ACCOUNT_FORM_LABELS, 
  CREATE_ACCOUNT_PAGE_EMPTY_FIELD_ERROR_MESSAGE, 
  CREATE_ACCOUNT_PAGE_PASSWORD_CONFIRMATION_ERROR, 
  CREATE_ACCOUNT_PAGE_PASSWORD_ERROR_MESSAGE, 
  CREATE_ACCOUNT_PAGE_PASSWORD_WITH_SPACES_MESSAGE, 
  CREATE_CUSTOMER_ACCOUNT_END_POINT, 
  MY_ACCOUNT_PAGE_END_POINT, 
  MY_ACCOUNT_PAGE_HEADER, 
  MY_ACCOUNT_PAGE_TABNAME, 
  NEW_USER_DATA } from "../helpers/testData.js";
import MyAccountPage from "../page_objects/myAccountPage.js";

test.describe("createAccountPage.spec", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
  });

  test("Check that all required fields are presented and empty in 'Create New Customer Account' form", 
  async ({ page }) => {
    const homePage = new HomePage(page);
    const createAccountPage = await homePage.clickCreateAnAccountLink();

    expect(await createAccountPage.getArrayOfFormLabels()).toEqual(CREATE_ACCOUNT_FORM_LABELS);
    expect(await createAccountPage.getArrayOfFormInputs()).toEqual(CREATE_ACCOUNT_FORM_INPUTS);
  });

  test("Check that user can create new account using valid data", async ({ page }) => {
    const homePage = new HomePage(page);
    const createAccountPage = await homePage.clickCreateAnAccountLink();
    const myAccountPage = new MyAccountPage(page);

    await createAccountPage.fillFirstNameInput(NEW_USER_DATA.firstName);
    await createAccountPage.fillLastNameInput(NEW_USER_DATA.lastName);
    await createAccountPage.fillEmailInput(NEW_USER_DATA.email);
    await createAccountPage.fillPasswordInput(NEW_USER_DATA.password);
    await createAccountPage.fillConfirmPasswordInput(NEW_USER_DATA.password);
    await createAccountPage.clickCreateAnAccountButton();

    await expect(myAccountPage.locators.getPageHeader()).toHaveText(MY_ACCOUNT_PAGE_HEADER);
    await expect(page).toHaveURL(BASE_URL + MY_ACCOUNT_PAGE_END_POINT);
    await expect(page).toHaveTitle(MY_ACCOUNT_PAGE_TABNAME);
    await expect(myAccountPage.locators.getPageMessageBlock()).toHaveText(ACCOUNT_CREATED_SUCCESSFULLY_MESSAGE);
  });

  test("Check that user can't register with password less than 8 characters", async ({ page }) => {
    const homePage = new HomePage(page);
    const createAccountPage = await homePage.clickCreateAnAccountLink();

    await createAccountPage.fillFirstNameInput(NEW_USER_DATA.firstName);
    await createAccountPage.fillLastNameInput(NEW_USER_DATA.lastName);
    await createAccountPage.fillEmailInput(NEW_USER_DATA.email);
    await createAccountPage.fillPasswordInput(NEW_USER_DATA.shortPassword);
    await createAccountPage.fillConfirmPasswordInput(NEW_USER_DATA.shortPassword);
    await createAccountPage.clickCreateAnAccountButton();

    await expect(page).toHaveURL(BASE_URL + CREATE_CUSTOMER_ACCOUNT_END_POINT);
    await expect(createAccountPage.locators.getPasswordErrorMessage()).toHaveText(CREATE_ACCOUNT_PAGE_PASSWORD_ERROR_MESSAGE);
  });

  NEW_USER_DATA.passwordWithSpaces.spacesLocation.forEach((condition, indx) => {
    test(`Verify that user can't register with password that ${condition} with spaces`, async ({ page }) => {
      const homePage = new HomePage(page);
      const createAccountPage = await homePage.clickCreateAnAccountLink();

      await createAccountPage.fillFirstNameInput(NEW_USER_DATA.firstName);
      await createAccountPage.fillLastNameInput(NEW_USER_DATA.lastName);
      await createAccountPage.fillEmailInput(NEW_USER_DATA.email);
      await createAccountPage.fillPasswordInput(NEW_USER_DATA.passwordWithSpaces.password[indx]);
      await createAccountPage.fillConfirmPasswordInput(NEW_USER_DATA.passwordWithSpaces.password[indx]);
      await createAccountPage.clickCreateAnAccountButton();

      await expect(page).toHaveURL(BASE_URL + CREATE_CUSTOMER_ACCOUNT_END_POINT);
      await expect(createAccountPage.locators.getPageAlertBlock()).toHaveText(CREATE_ACCOUNT_PAGE_PASSWORD_WITH_SPACES_MESSAGE);
    });
  });

  test("Verify that user can't register with different values in 'Password' and 'Confirm Password' fields", async ({ page }) => {
    const homePage = new HomePage(page);
    const createAccountPage = await homePage.clickCreateAnAccountLink();

    await createAccountPage.fillFirstNameInput(NEW_USER_DATA.firstName);
    await createAccountPage.fillLastNameInput(NEW_USER_DATA.lastName);
    await createAccountPage.fillEmailInput(NEW_USER_DATA.email);
    await createAccountPage.fillPasswordInput(NEW_USER_DATA.password);
    await createAccountPage.fillConfirmPasswordInput(NEW_USER_DATA.differentPassword);
    await createAccountPage.clickCreateAnAccountButton();

    await expect(page).toHaveURL(BASE_URL + CREATE_CUSTOMER_ACCOUNT_END_POINT);
    await expect(createAccountPage.locators.getPasswordConfirmationErrorMessage()).toHaveText(CREATE_ACCOUNT_PAGE_PASSWORD_CONFIRMATION_ERROR);
  });

  CREATE_ACCOUNT_FORM_LABELS.forEach(field => {
    test(`Verify that user can't register with empty ${field} field`, async ({ page }) => {
      const homePage = new HomePage(page);
      const createAccountPage = await homePage.clickCreateAnAccountLink();

      field === "First Name" ? null : await createAccountPage.fillFirstNameInput(NEW_USER_DATA.firstName);
      field === "Last Name" ? null : await createAccountPage.fillLastNameInput(NEW_USER_DATA.lastName);
      field === "Email" ? null : await createAccountPage.fillEmailInput(NEW_USER_DATA.email);
      field === "Password" ? null : await createAccountPage.fillPasswordInput(NEW_USER_DATA.password);
      field === "Confirm Password" ? null : await createAccountPage.fillConfirmPasswordInput(NEW_USER_DATA.password);
      await createAccountPage.clickCreateAnAccountButton();

      await expect(page).toHaveURL(BASE_URL + CREATE_CUSTOMER_ACCOUNT_END_POINT);
      await expect(createAccountPage.locators.getFieldErrorMessage(field)).toBeVisible();
      await expect(createAccountPage.locators.getFieldErrorMessage(field)).toHaveText(CREATE_ACCOUNT_PAGE_EMPTY_FIELD_ERROR_MESSAGE);
    });
  });
})