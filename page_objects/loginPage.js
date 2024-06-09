import HomePage from "./homePage.js";

class LoginPage {
  constructor (page) {
    this.page = page;
  }

  locators = {
    getPageHeader: () => this.page.getByRole("heading").first(),
    getEmailField: () => this.page.getByLabel("Email", { exact: true }),
    getPasswordField: () => this.page.getByLabel("Password"),
    getSignInButton: () => this.page.getByRole("button", { name: "Sign In", exact: true }),
    getFieldErrorMessage: (fieldName) => this.page.locator(`input[title="${fieldName}"]+div`),
  }

  async fillEmailField (email) {
    await this.locators.getEmailField().fill(email);

    return new LoginPage(this.page);
  }

  async fillPasswordField (password) {
    await this.locators.getPasswordField().fill(password);

    return new LoginPage(this.page);
  }

  async clickSignInButton () {
    await this.locators.getSignInButton().click();

    return new HomePage(this.page);
  }
}

export default LoginPage;