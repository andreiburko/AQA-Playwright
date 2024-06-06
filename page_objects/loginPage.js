class LoginPage {
  constructor (page) {
    this.page = page;
  }

  locators = {
    getPageHeader: () => this.page.getByRole("heading").first(),
  }
}

export default LoginPage;