import CommonPage from "./commonPage.js";

export default class DashboardPage extends CommonPage {
    constructor(page){
        super(page);
        this.userNameValue='//label[contains(@id,"userName-value")]';
        this.sideBarSubMenuItem =(mainCard,subCard)=>`//div[@class="header-text" and text()="${mainCard}"]//ancestor::div[@class="element-group"]//ul[@class="menu-list"]//span[text()="${subCard}"]//ancestor::li`;
        this.booksWrapper = '//div[@class="books-wrapper"]';
    }
    async getUserName(){
        return await this.page.locator(this.userNameValue).textContent();
    }
    async selectSideBarSubMenuItem(mainCard,subCard){
        await this.click(this.sideBarSubMenuItem(mainCard,subCard));
        await this.loadingWait();
    }

   

}