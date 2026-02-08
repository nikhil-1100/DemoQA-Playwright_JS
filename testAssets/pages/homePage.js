import CommonPage from "./commonPage.js";

export default class HomePage extends CommonPage {
    constructor(page){
        super(page);
        this.cards=(name)=>`//div[contains(@class,"cards")]//h5[contains(text(),"${name}")]//ancestor::div[contains(@class,"top-card")]`
        this.expandedCard=(name)=>`//div[@class="header-text" and text()="${name}"]//ancestor::div[@class="element-group"]//div[@class="element-list collapse show"]`
    }

    async selectCard(name){
        await this.click(this.cards(name));
        await this.loadingWait();
        await this.waitForDisplayed(this.expandedCard(name));

    }

    async selectLogin(){
        await this.click(this.buttonWithText("Login"))
        await this.loadingWait();
        await this.waitForDisplayed(this.h1Text("Login"))
    }
    

}