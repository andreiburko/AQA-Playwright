import { createRandomEmail } from "./testUtils.js";

// URL
export const BASE_URL = "https://magento.softwaretestingboard.com";
export const WHATS_NEW_PAGE_END_POINT = "/what-is-new.html";
export const CREATE_CUSTOMER_ACCOUNT_END_POINT = "/customer/account/create/";
export const MY_ACCOUNT_PAGE_END_POINT = "/customer/account/";
export const LOGIN_PAGE_END_POINT = "/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/";
export const CART_PAGE_END_POINT = "/checkout/cart/";
export const NAVBAR_MENU_URLs_END_POINTS = [
  "/what-is-new.html",
  "/women.html",
  "/men.html",
  "/gear.html",
  "/training.html",
  "/sale.html"
];

// Test data
export const HOME_PAGE_TITLE = "Home Page";
export const WHATS_NEW_PAGE_HEADER = "What's New";
export const CREATE_ACCOUNT_PAGE_TITLE_AND_HEADER = "Create New Customer Account";
export const CREATE_ACCOUNT_FORM_LABELS = ["First Name", "Last Name", "Email", "Password", "Confirm Password"];
export const CREATE_ACCOUNT_FORM_INPUTS = ["", "", "", "", ""];
export const MY_ACCOUNT_PAGE_HEADER = "My Account";
export const MY_ACCOUNT_PAGE_TABNAME = "My Account";
export const ACCOUNT_CREATED_SUCCESSFULLY_MESSAGE = "Thank you for registering with Main Website Store.";
export const CREATE_ACCOUNT_PAGE_PASSWORD_ERROR_MESSAGE = "Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.";
export const CREATE_ACCOUNT_PAGE_PASSWORD_WITH_SPACES_MESSAGE = "The password can't begin or end with a space. Verify the password and try again.";
export const CREATE_ACCOUNT_PAGE_PASSWORD_CONFIRMATION_ERROR = "Please enter the same value again.";
export const CREATE_ACCOUNT_PAGE_EMPTY_FIELD_ERROR_MESSAGE = "This is a required field.";
export const NAVBAR_MENU = ["What's New", "Women", "Men", "Gear", "Training", "Sale"];
export const LOGIN_PAGE_HEADER = "Customer Login";
export const LOGIN_PAGE_FIELDS = ["Email", "Password"];
export const LOGIN_PAGE_EMPTY_FIELD_ERROR_MESSAGE = "This is a required field.";
export const CART_PAGE_HEADER = "Shopping Cart";

export const MEN_TOPS_PAGE_ADDED_IN_CART_ITEMS = [
  {
    name: "Tiberius Gym Tank",
    size: "S",
    color: "Yellow",
  },
  {
    name: "Argus All-Weather Tank",
    size: "M",
    color: "Gray",
  },
  {
    name: "Primo Endurance Tank",
    size: "L",
    color: "Red",
  }
];

// Login credentials
export const NEW_USER_DATA = {
  firstName: "Charlize",
  lastName: "Theron",
  email: createRandomEmail(),
  password: "ASDasd1234",
  differentPassword: "ASDasd1234@",
  shortPassword: "asQW34@",
  passwordWithSpaces: {
    spacesLocation: ["starts", "ends", "starts and ends"],
    password: [" asdQWE123", "asdQWE123 ", "  asdQWE123  "],
  },
};

export const EXISTING_USER_DATA = {
  email: "andrei@test.com",
  password: "Andrei111",
  name: "Andrei",
  lastName: "Tester",
  get welcomeMessage() {
    return `Welcome, ${this.name} ${this.lastName}!`;
  },
};