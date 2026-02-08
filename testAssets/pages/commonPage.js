import { time } from "console";
import fs from "fs";
import path from "path";

const config = JSON.parse(
  fs.readFileSync(path.resolve("testAssets/testData/url.json"), "utf-8"),
);

const { urls, timeouts } = config;

export default class CommonPage {
  constructor(page) {
    this.page = page;
    this.urls = urls;
    this.timeouts = timeouts;
    this.homePageHeader = '//header//a/img[contains(@src,"Toolsqa")]';
    this.buttonWithText = (text) => `//button[text()="${text}"]`;
    this.h1Text = (text) => `//h1[text()="${text}"]`;
    this.h2Text = (text) => `//h2[text()="${text}"]`;
    this.h3Text = (text) => `//h3[text()="${text}"]`;
    this.inputWithId = (text) => `//input[contains(@id,"${text}")]`;
    this.loading = '//div[contains(@id,"loading")]'
  }

  // waits
 async waitForDisplayed(locator, duration = 'max') {
  const timeout = this.timeouts[duration];

  if (!timeout) {
    throw new Error(
      `Invalid timeout "${duration}". Available: ${Object.keys(this.timeouts).join(', ')}`
    );
  }
  const element = this.page.locator(locator);
  await element.waitFor({ state: 'visible', timeout: timeout });
  
}


  async loadUrl(url) {
    const baseUrl = urls[url];
    if (!baseUrl) {
      throw new Error(`Invalid url "${url}"`);
    }

    const { width, height } = await this.page.evaluate(() => ({
      width: window.screen.availWidth,
      height: window.screen.availHeight,
    }));
    await this.page.setViewportSize({ width, height });
    await this.page.goto(baseUrl);
    await this.loadingWait();
    await this.waitForDisplayed(this.homePageHeader);


  }

  //loading

  async loadingWait(duration = 'max') {
  const timeout = this.timeouts[duration];

  const loader = this.page.locator(this.loading);

  await loader.waitFor({state: 'hidden',timeout});
}


  //Click

  async click(locator) {
    await this.page.locator(locator).click();
  }

  async fillInput(locator, text) {
    await this.page.locator(locator).fill(text);
  }

  
}
