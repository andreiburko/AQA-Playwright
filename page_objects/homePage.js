import WhatsNewPage from "./whatsNewPage.js";
import CreateAccountPage from "./createAccountPage.js";
import LoginPage from "./loginPage.js";

class HomePage {
  constructor (page) {
    this.page = page;
  }

  locators = {
    getWhatsNewLink: () => this.page.getByRole("listitem").filter({ hasText: "What's New" }),
    getCreateAnAccountLink: () => this.page.getByRole("link", { name: "Create an Account" }),
    getMainMenuLinks: (pageName) => this.page.getByText(pageName, { exact: true }),
    getSignInLink: () => this.page.getByRole("link", { name: "Sign In ", exact: true }),
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

  async clickSignInLink() {
    await this.locators.getSignInLink().click();

    return new LoginPage(this.page);
  }
}

export default HomePage;