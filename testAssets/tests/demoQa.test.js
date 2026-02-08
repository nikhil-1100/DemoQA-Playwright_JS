import { test, expect } from "@playwright/test";
import LoginPage from '../pages/LoginPage.js'
import HomePage from '../pages/homePage.js';
import testData from '../testData/demoQA.json' assert { type: 'json' };
import DashboardPage from  '../pages/dashboardPage.js'
import BookStorePage from "../pages/bookStorePage.js";


let homePage,
loginPage,
dashboardPage,
bookStorePage
let userNameValue

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  bookStorePage = new BookStorePage(page);
});

test("DemoQA Automation", async ({ page }) => {
  //Step 1 : Launch the URL
    await homePage.loadUrl("DemoQA");
    await expect(page,"Expected DemoQA home page URL to be loaded").toHaveURL(process.env.BASE_URL);
    await expect(page.locator(homePage.homePageHeader),"Expected DemoQA logo is displayed").toBeVisible();

  //Step 2 : Click on the "Book Store Application" card
    await homePage.selectCard(testData.CardName);
    await expect(page.locator(homePage.expandedCard(testData.CardName)),`Expected ${testData.CardName} is expanded`).toBeVisible();
    await expect(page.locator(homePage.buttonWithText("Login")),`Expected Login button is displayed `).toBeVisible();
  
  //Step 3 : Click on the "Login" button
    await homePage.selectLogin();
    await expect(page.locator(loginPage.h1Text("Login")),`Expected Login page header is displayed`).toBeVisible();

  //Step 4 : Login with valid credentials
    await loginPage.userLogin(process.env.APP_USERNAME, process.env.APP_PASSWORD);
    await expect(page.locator(dashboardPage.buttonWithText("Log out")),`Expected Logout button is displayed`).toBeVisible();
    userNameValue = await dashboardPage.getUserName();
    expect(userNameValue).toContain(process.env.APP_USERNAME);

  //Step 5 : Click on the "Book Store Application" card
    await dashboardPage.selectSideBarSubMenuItem(testData.CardName,testData.SubCardName);
    await expect(page.locator(dashboardPage.booksWrapper),`Expected navigated to Book Store page`).toBeVisible();

  //Step 6 : Search for a book
    await bookStorePage.searchBook(testData.bookName);
    await expect(page.locator(bookStorePage.bookName(testData.bookName)),`Expected ${testData.BookName} book is displayed`).toBeVisible();

  //Step 7: Store book details to a txt file
  const isBookDetailsStored = await bookStorePage.storeDetailsToTxt(testData.bookName);
  expect(isBookDetailsStored,"Expected book details to be stored to a txt file").toBe(true);

  //Step 8: Logout
    await loginPage.userLogout();
    await expect(page.locator(loginPage.h1Text("Login")),`Expected Login page header is displayed`).toBeVisible();




    

})