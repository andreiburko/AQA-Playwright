import WhatsNewPage from "./whatsNewPage.js";
import CreateAccountPage from "./createAccountPage.js";
import LoginPage from "./loginPage.js";
import MenPage from "./menPage.js";
import CartPage from "./cartPage.js";

class HomePage {
  constructor (page) {
    this.page = page;
  }

  locators = {
    getWhatsNewLink: () => this.page.getByRole("listitem").filter({ hasText: "What's New" }),
    getCreateAnAccountLink: () => this.page.getByRole("link", { name: "Create an Account" }),
    getMainMenuLinks: (pageName) => this.page.getByText(pageName, { exact: true }),
    getSignInLink: () => this.page.getByRole("link", { name: "Sign In ", exact: true }),
    getWelcomeMessage: () => this.page.locator("div.header span.logged-in"),
    getMenMainMenuLink: () => this.page.locator('a[href$="/men.html"]'),
    getCartLoader: () => this.page.getByAltText("Loading..."),
    getCartIconLink: () => this.page.locator("a.showcart"),
    getViewAndEditCartLink: () => this.page.getByRole("link", { name: "View and Edit Cart" }),
  }

  async open() {
    await this.page.goto("/");

    return this;
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

  async clickMenMainMenu() {
    await this.locators.getMenMainMenuLink().click();

    return new MenPage(this.page);
  }

  async waitLoaderIsHidden() {
    await this.locators.getCartLoader().waitFor({ state: "hidden" });

    return this;
  }

  async clickCartIconLink() {
    await this.locators.getCartIconLink().click();

    return this;
  }

  async clickViewAndEditCartLink() {
    await this.locators.getViewAndEditCartLink().click();

    return new CartPage(this.page);
  }
}

export default HomePage;