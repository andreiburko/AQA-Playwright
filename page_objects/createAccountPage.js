import MyAccountPage from "./myAccountPage.js";

class CreateAccountPage {
  constructor(page) {
    this.page = page;
  }

  locators = {
    getPageHeader: () => this.page.getByRole("heading").first(),
    getFormLabels: () => this.page.locator("#form-validate label"),
    getFormInputs: () => this.page.locator("#form-validate input.input-text"),
    getFirstNameInput: () => this.page.getByLabel("First Name"),
    getLastNameInput: () => this.page.getByLabel("Last Name"),
    getEmailInput: () => this.page.getByLabel("Email", { exact: true }),
    getPasswordInput: () => this.page.getByRole("textbox", { name: "Password*", exact: true }),
    getConfirmPasswordInput: () => this.page.getByLabel("Confirm Password", { exact: true }),
    getCreateAnAccountButton: () => this.page.getByRole("button", { name: "Create an Account"}),
    getPasswordErrorMessage: () => this.page.locator("#password-error"),
    getPageAlertBlock: () => this.page.locator("div[data-ui-id='message-error']>div"),
    getPasswordConfirmationErrorMessage: () => this.page.locator("div#password-confirmation-error"),
    getFieldErrorMessage: (field) => this.page.locator(`input[title="${field}"] + div`),
  }

  async getArrayOfFormLabels() {
    return await this.locators.getFormLabels().allInnerTexts();
  }

  async getArrayOfFormInputs() {
    return await this.locators.getFormInputs().allInnerTexts();
  }

  async fillFirstNameInput(firstName) {
    await this.locators.getFirstNameInput().fill(firstName);

    return new CreateAccountPage(this.page);
  }

  async fillLastNameInput(lastName) {
    await this.locators.getLastNameInput().fill(lastName);

    return new CreateAccountPage(this.page);
  }

  async fillEmailInput(email) {
    await this.locators.getEmailInput().fill(email);

    return new CreateAccountPage(this.page);
  }

  async fillPasswordInput(password) {
    await this.locators.getPasswordInput().fill(password);

    return new CreateAccountPage(this.page);
  }

  async fillConfirmPasswordInput(password) {
    await this.locators.getConfirmPasswordInput().fill(password);

    return new CreateAccountPage(this.page);
  }

  async clickCreateAnAccountButton() {
    await this.locators.getCreateAnAccountButton().click();

    return new MyAccountPage(this.page);
  }
}

export default CreateAccountPage;