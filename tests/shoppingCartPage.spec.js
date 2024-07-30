import { test, expect } from "@playwright/test";
import HomePage from "../page_objects/homePage.js";
import { BASE_URL, CART_PAGE_END_POINT, CART_PAGE_HEADER, MEN_TOPS_PAGE_ADDED_IN_CART_ITEMS } from "../helpers/testData.js";

test.describe("shoppingCartPage.spec", () => {
  test("Verify that user can add items to cart", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    const menPage = await homePage.clickMenMainMenu();
    const menTopsPage = await menPage.clickTopsCategoryLink(); 
    await menTopsPage.waitForSizeAndColorBlocks();

    for (let i = 0; i < MEN_TOPS_PAGE_ADDED_IN_CART_ITEMS.length; i++) {
      await menTopsPage.clickSizeButton(MEN_TOPS_PAGE_ADDED_IN_CART_ITEMS[i]);
      await menTopsPage.clickColorButton(MEN_TOPS_PAGE_ADDED_IN_CART_ITEMS[i]);
      await menTopsPage.clickAddToCartButton(MEN_TOPS_PAGE_ADDED_IN_CART_ITEMS[i].name);
    }

    await homePage.waitLoaderIsHidden();
    await homePage.clickCartIconLink();
    const cartPage = await homePage.clickViewAndEditCartLink();

    await expect(page).toHaveURL(BASE_URL + CART_PAGE_END_POINT);
    await expect(page).toHaveTitle(CART_PAGE_HEADER);
    await expect(cartPage.locators.getPageHeader()).toHaveText(CART_PAGE_HEADER);
    await expect(cartPage.locators.getItemsArray()).toHaveCount(MEN_TOPS_PAGE_ADDED_IN_CART_ITEMS.length);
  })
})