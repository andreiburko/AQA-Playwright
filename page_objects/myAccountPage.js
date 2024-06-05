class MyAccountPage {
  constructor(page) {
    this.page = page;
  }

  locators = {
    getPageHeader: () => this.page.getByRole("heading").first(),
    getPageMessageBlock: () => this.page.locator("div.page.messages"),
  }
}

export default MyAccountPage;