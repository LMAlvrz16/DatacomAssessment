import { Page, errors } from '@playwright/test';
import { Common } from './Common'
import { URL } from '../data/users'

export class HomePage extends Common{
    readonly page: Page;
    
    constructor(page: Page){
        super(page);
        this.page = page;
    }

    // List of Xpaths in Home Page
    public btn_Menu = "//button[@class='Button Button--transparent js-main-menu-btn MenuButton']";
    public link_Payees = "//*[text()='Payees']";
    public link_PayOrTransfer = "//*[text()='Pay or transfer']";
    public div_Accounts = "//div[@id='accounts']/div";
    public span_AccountName = "xpath=child::div[2]/span[1]";
    public span_AccountBalance = "xpath=child::div[2]/span[3]";
    public h3_LoadingScreen = "//h3[@class='ApplicationLoading-heading']";

    // This will click the menu
    async ClickMenu(){
        await this.Click(this.btn_Menu, "Menu Button");
    }

    // This will click the Payees Link
    async ClickPayees(){
        await this.Click(this.link_Payees, "Payees Link");
    }

    // This will click the Pay or Transfer Link
    async ClickPayOrTransfer(){
        await this.Click(this.link_PayOrTransfer, "Pay or Transfer Link");
    }

    // This get the total balances of each account
    async GetAllAccountBalance(){
        try{
            await this.Sleep(5000);
            //await this.WaitForElementToBeHidden(this.h3_LoadingScreen, 5000);
            var accounts = await this.FindElements(this.div_Accounts, "All Accounts");
            var accountsDetails: string[] = [];
            for(var i = 0; i<accounts.length-6; i++){
                var accountNameElement = await this.FindSubElementOnElement(accounts[i], this.span_AccountName, "Account Name");
                var accountBalanceElement = await this.FindSubElementOnElement(accounts[i], this.span_AccountBalance, "Account Balance");
                var accountName = await this.GetLiveElementText(accountNameElement, "Account Name");
                var accountBalance = await this.GetLiveElementText(accountBalanceElement, "Account Name");
                accountsDetails.push(accountName+":"+(accountBalance.replace(",","")).replace(".00",""));
            }
            return accountsDetails;
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }else{
                throw new Error(e.stack);
            }
        }
    }

    // This verifies if account has successfully transfered the amount you have input
    async VerifyIfTransactionSuccessful(balancesBefore: string[], balancesAfter: string[]){
        try{
            var senderAccount: any, senderBalance: any, receiverAccount:any, receiverBalance:any,
            senderBalanceBefore:any, receiverBalanceBefore:any, senderFlag = "false", receiverFlag = "false";
            for(var i = 0; i<balancesAfter.length; i++){
                console.log(parseInt(balancesBefore[i].split(":")[1]));
                console.log(parseInt(balancesAfter[i].split(":")[1]));
                if(parseInt(balancesBefore[i].split(":")[1]) > parseInt(balancesAfter[i].split(":")[1])){
                    senderAccount = balancesAfter[i].split(":")[0];
                    senderBalance = balancesAfter[i].split(":")[1];
                    senderBalanceBefore = balancesBefore[i].split(":")[1];
                    senderFlag = "true";
                }
                if(parseInt(balancesBefore[i].split(":")[1]) < parseInt(balancesAfter[i].split(":")[1])){
                    receiverAccount = balancesAfter[i].split(":")[0];
                    receiverBalance = balancesAfter[i].split(":")[1];
                    receiverBalanceBefore = balancesBefore[i].split(":")[1];
                    receiverFlag = "true";
                }
            }
            if(senderFlag == "true" && receiverFlag == "true" ){
                var senderAmountTransfered = parseInt(senderBalanceBefore) - parseInt(senderBalance);
                var ReceiverAmountTransfered = parseInt(receiverBalance) - parseInt(receiverBalanceBefore);
                if(senderAmountTransfered == ReceiverAmountTransfered){
                    console.log("The amount of "+senderAmountTransfered+" has been successfully transfered:"
                    +"\nFrom: "+senderAccount
                    +"\nBalance before transaction: "+senderBalanceBefore
                    +"\nBalance after transaction: "+senderBalance
                    +"\nTo: "+receiverAccount
                    +"\nBalance before transaction: "+receiverBalanceBefore
                    +"\nBalance after transaction: "+receiverBalance);
                }else{
                    throw new Error("Actual and Expected amount transfered does NOT matched"
                    +"\nActual Amount: "+senderAmountTransfered
                    +"\nExpected Amount: "+ReceiverAmountTransfered);
                }
                
            }else{
                throw new Error("The transaction is unsuccessful");
            }
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }else{
                throw new Error(e.stack);
            }
        }
    }
}