import CommonPage from "./commonPage.js";

export default class Login extends CommonPage {
  constructor(page) {
    super(page);
  }

  async userLogin(userName, password) {
    await this.fillInput(this.inputWithId("userName"), userName);
    await this.fillInput(this.inputWithId("password"), password);
    await this.click(this.buttonWithText("Login"));
    await this.loadingWait();
  }

  async userLogout() {
    await this.click(this.buttonWithText("Log out"));
    await this.loadingWait();
  }
}
