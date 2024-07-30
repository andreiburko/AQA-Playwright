class MenTopsPage {
  constructor (page) {
    this.page = page;
  }

  locators = {
    getItemSizeAndColorBlock: () => this.page.locator("div[data-rendered]").first(),
    getItemBlock: (itemName) => this.page.getByRole("listitem").filter({ hasText: itemName }),
    getSizeButton: (item) => this.locators.getItemBlock(item.name).locator(`div[option-label=${item.size}]`),
    getColorButton: (item) => this.locators.getItemBlock(item.name).locator(`div[option-label=${item.color}]`),
    getAddToCartButton: (itemName) => this.locators.getItemBlock(itemName).getByRole("button", { name: "Add to Cart" }),
  }

  async waitForSizeAndColorBlocks() {
    return await this.locators.getItemSizeAndColorBlock().waitFor({ state: "visible" });
  }

  async clickSizeButton(item) {
    return await this.locators.getSizeButton(item).click();
  }

  async clickColorButton(item) {
    return await this.locators.getColorButton(item).click();
  }

  async clickAddToCartButton(itemName) {
    return await this.locators.getAddToCartButton(itemName).click();
  }
}

export default MenTopsPage;