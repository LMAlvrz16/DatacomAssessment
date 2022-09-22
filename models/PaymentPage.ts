import { Page, errors } from '@playwright/test';
import { Common } from './Common'
import { URL } from '../data/users'

export class PaymentPage extends Common{
    readonly page: Page;
    
    constructor(page: Page){
        super(page);
        this.page = page;
    }

    // List of Xpaths in Home Page
    public btn_From = "//button[@data-testid='from-account-chooser']";
    public btn_To = "//button[@data-testid='to-account-chooser']";
    public btn_PayOrTransfer = "//div[@class='ButtonGroup-component-84 ButtonGroup-right-85']/button[1]";
    public input_Amount = "//input[@name='amount']";
    public input_Search = "//span/input[@placeholder='Search']";
    public ul_FromAccountList = "//ul/li[X]/button";
    public ul_ToAccountList = "//section/ul/li/button";
    public ul_SearchResult = "//ul[@class='list-1-1-76 is-titlePresent']/li/button"
    public span_SuccessMsg = "//div[@class='inner js-notification show js-notificationShown']/span";
    public span_AccountsTab = "//span[text()='Accounts']";
    public div_PaymentModal = "//div[@class='ModalContent-component-6 content-1-1-25']";

    // This verify if payments modal exist
    async VerifyPaymentModalExist(){
        if(!await this.ElementExist(this.div_PaymentModal, 8000)){
            throw new Error("Payment modal does NOT exist");
        }else{
            if(!await this.ElementEnabled(this.btn_PayOrTransfer)){
                throw new Error("Pay or Transfer button shou8ld be disabled")
            }
        }
    }

    // This verify if accounts were displayed
    async VerifyFromAccounts(){
        if(!await this.ElementExist(this.ul_FromAccountList.replace("[X]",""), 8000)){
            throw new Error("Accounts were NOT displayed");
        }
    }

    // This verify if accounts were displayed
    async VerifyToAccounts(){
        if(!await this.ElementExist(this.ul_ToAccountList.replace("section/",""), 8000)){
            throw new Error("Accounts were NOT displayed");
        }
    }

    // This will click the From button
    async ClickFrom(){
        await this.Click(this.btn_From, "From Account");
    }

    // This will click the To button
    async ClickTo(){
        await this.Click(this.btn_To, "To Account");
    }

    // This click Accounts Tab
    async ClickAccountsTab(){
        await this.Click(this.span_AccountsTab, "Accounts Tab");
    }

    // This will select/search an account
    async ChooseAccounts(chooseType: string, account: string, activity: string){
        try{
            var index = "";
            if(account == "bills"){
                index = "1";
            }else if(account == "everyday"){
                index = "2";
            }else if(account == "savings"){
                index = "3";
            }else if(account == "platinum visa"){
                index = "4";
            }else{
                throw new Error("Wrong inputs");
            }
            switch(chooseType.toLowerCase().trim()){
                case "search":
                    if(activity == "from"){
                        await this.EnterValue(this.input_Search, account, "Search Bar");
                        await this.Click(this.ul_FromAccountList.replace("[X]",""), "Account Search");
                    }else{
                        await this.EnterValue(this.input_Search, account, "Search Bar");
                        await this.Click(this.ul_ToAccountList, "Account Search");
                    }
                    break;
                case "select":
                    if(activity == "from"){
                        await this.Click(this.ul_FromAccountList.replace("X",index), "Accounts");
                    }else{
                        await this.ClickAccountsTab();
                        await this.VerifyToAccounts();
                        await this.Click(this.ul_FromAccountList.replace("X",index), "Accounts");
                    }
                    break;
            }
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }else{
                throw new Error(e.stack);
            }
        }
    }

    // This will search specific account
    async SearchSpecificAccountFrom(account: string){
        await this.EnterValue(this.input_Search, account, "Search Bar");
        await this.Click(this.ul_FromAccountList, "Account Search");
    }

    // This will search specific account
    async SearchSpecificAccountTo(account: string){
        await this.EnterValue(this.input_Search, account, "Search Bar");
        await this.Click(this.ul_ToAccountList, "Account Search");
    }

    // This input any amount
    async EnterAmount(amount: string){
        await this.EnterValue(this.input_Amount, amount, "Enter Amount");
    }

    // This click Transfer button
    async ClickTransferBtn(){
        await this.Click(this.btn_PayOrTransfer, "Pay & Transfer Button")
    }

    // This verify if successfully transfered or not
    async VerifyTransferSuccess(){
        if(!await this.ElementExist(this.span_SuccessMsg, 8000)){
            throw new Error("Transfer unsuccessful");
        }
    }
    
}