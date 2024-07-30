import MenTopsPage from "./menTopsPage.js";

class MenPage {
  constructor (page) {
    this.page = page;
  }

  locators = {
    getTopsCategoryLink: () => this.page.getByRole("link", { name: "Tops" }),
  }

  async clickTopsCategoryLink() {
    await this.locators.getTopsCategoryLink().click();

    return new MenTopsPage(this.page);
  }
}

export default MenPage;