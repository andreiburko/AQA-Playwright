import WhatsNewPage from "./whatsNewPage.js";
import CreateAccountPage from "./createAccountPage.js";

class HomePage {
  constructor (page) {
    this.page = page;
  }

  locators = {
    getWhatsNewLink: () => this.page.getByRole("listitem").filter({ hasText: "What's New" }),
    getCreateAnAccountLink: () => this.page.getByRole("link", { name: "Create an Account" }),
    getMainMenuLinks: (pageName) => this.page.getByText(pageName, { exact: true }),
  }

  async open() {
    await this.page.goto("/");
  }

  async clickWhatsNewLink() {
    await this.locators.getWhatsNewLink().click();

    return new WhatsNewPage(this.page);
  }

  async clickCreateAnAccountLink() {
    await this.locators.getCreateAnAccountLink().click();

    return new CreateAccountPage(this.page);
  }

  async clickMainMenuLinks(pageName) {
    await this.locators.getMainMenuLinks(pageName).click();
  }
}

export default HomePage;