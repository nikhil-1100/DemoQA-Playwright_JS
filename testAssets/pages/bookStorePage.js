import fs from "fs";
import path from "path";
import CommonPage from "./commonPage.js";

export default class BookStorePage extends CommonPage {
  constructor(page) {
    super(page);
    this.bookDetailsFile = path.resolve(
      "testAssets/artifacts/book_details.txt",
    );
    this.searchIcon = '//div[@class="input-group-append"]';
    this.bookName = (name) =>
      `//div[@role="rowgroup"]//div[@class="action-buttons"]//a[contains(text(),"${name}")]`;
    this.authorName = (bookName) =>
      `(//div[@class="action-buttons"]//a[contains(text(),"${bookName}")]//ancestor::div[@role="row"]//div[@role="gridcell"])[3]`;
    this.publisherName = (bookName) =>
      `(//div[@class="action-buttons"]//a[contains(text(),"${bookName}")]//ancestor::div[@role="row"]//div[@role="gridcell"])[4]`;
  }
  async searchBook(bookName) {
    await this.fillInput(this.inputWithId("searchBox"), bookName);
    await this.click(this.searchIcon);
    await this.loadingWait();
  }

  async storeDetailsToTxt(bookName) {
    try {
      const authorNameValue = await this.page
        .locator(this.authorName(bookName))
        .textContent();

      const publisherNameValue = await this.page
        .locator(this.publisherName(bookName))
        .textContent();

      if (!authorNameValue || !publisherNameValue) {
        throw new Error("Book details not found on page");
      }

      const content = `Book Name: ${bookName}\nAuthor Name: ${authorNameValue.trim()}\nPublisher Name: ${publisherNameValue.trim()}
    `;

      fs.appendFileSync(this.bookDetailsFile, content, "utf-8");

      return true;
    } catch (error) {
      throw new Error(
        `Failed to store book details for "${bookName}": ${error.message}`,
      );
    }
  }


}
