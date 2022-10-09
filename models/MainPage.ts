import { Page, errors } from '@playwright/test';
import { Common } from './Common'

export class MainPage extends Common{
    readonly page: Page;
    
    constructor(page: Page){
        super(page);
        this.page = page;
    }

    // List of xpaths
    // Primary Menu
    public tab_Integrations = "//div/ul[@id='menu-primary']/li[2]";
    public div_LoadingIcon = "//div[@class='loading']";

    // Navigate to Reekoh Page
    async Open(url: string){
        try{
            await this.GoTo(url, "Reekoh")
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }else{
                throw new Error(e.stack);
            }
        }
    }

    async ClickIntegrationsTab(){
        await this.Click(this.tab_Integrations, "Integrations Tab");
    }

    async WaitForLoadingToDisappear(){
        await this.WaitForElementToBeHidden(this.div_LoadingIcon);
        console.log("Loading disppeared");
    }

}