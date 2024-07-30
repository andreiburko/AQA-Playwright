class CartPage {
  constructor (page) {
    this.page = page;
  }

  locators = {
    getPageHeader: () => this.page.getByRole("heading").first(),
    getItemsArray: () => this.page.locator("tbody.item"),
  }

  async getItemsCountInCart() {
    return await this.locators.getItemsArray().count();
  }
}

export default CartPage;