import { test, expect } from "@playwright/test";
import HomePage from "../page_objects/homePage.js";
import { BASE_URL,
  CREATE_ACCOUNT_PAGE_TITLE_AND_HEADER, 
  CREATE_CUSTOMER_ACCOUNT_END_POINT,
  WHATS_NEW_PAGE_END_POINT, 
  WHATS_NEW_PAGE_HEADER,
  NAVBAR_MENU,
  NAVBAR_MENU_URLs_END_POINTS } from "../helpers/testData.js";

test.describe("homePage.spec", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
  });

  test('Verify user can navigate to home page clicking on logo from "What\'s New" page', async ({ page }) => {
    const homePage = new HomePage(page);
    const whatsNewPage = await homePage.clickWhatsNewLink();
    await expect(page).toHaveURL(BASE_URL + WHATS_NEW_PAGE_END_POINT);
    await expect(whatsNewPage.locators.getPageHeader()).toHaveText(WHATS_NEW_PAGE_HEADER);

    await whatsNewPage.clickLogoLink();
    expect(page).toHaveURL(BASE_URL);
  });

  test("Check redirecting to 'Create New Customer Account' page after click on 'Create an Account' link", async ({ page }) => {
    const homePage = new HomePage(page);
    const createAccountPage = await homePage.clickCreateAnAccountLink();

    await expect(page).toHaveURL(BASE_URL + CREATE_CUSTOMER_ACCOUNT_END_POINT);
    await expect(page).toHaveTitle(CREATE_ACCOUNT_PAGE_TITLE_AND_HEADER);
    await expect(createAccountPage.locators.getPageHeader()).toHaveText(CREATE_ACCOUNT_PAGE_TITLE_AND_HEADER);
  });

  NAVBAR_MENU.forEach((pageName, indx) => {
    test(`Verify that user can navigate to ${pageName} from main menu`, async ({ page }) => {
      const homePage = new HomePage(page);

      await homePage.clickMainMenuLinks(pageName);
      await expect(page).toHaveURL(BASE_URL + NAVBAR_MENU_URLs_END_POINTS[indx]);
      await expect(page.getByRole("heading").first()).toHaveText(pageName);
    });
  });
})