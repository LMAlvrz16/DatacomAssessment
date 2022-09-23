import { Page, errors } from '@playwright/test';
import { Common } from './Common'
import { URL } from '../data/users'
import { SmokeSteps } from './SmokeSteps';

export class PayeesPage extends Common{
    readonly page: Page;
    
    
    constructor(page: Page){
        super(page);
        this.page = page;
    }

    // List of Xpath in Payees page
    public btn_Add = "//button[@class='Button Button--sub Button--translucid js-add-payee']";
    public span_SuccessMsg = "//div[@class='inner js-notification show js-notificationShown']/span";
    public ul_PayeesList = "//ul/li";
    public li_PayeesName = "xpath=child::div/div/div[1]/div/p/span[1]";
    public li_PayeesAccount = "xpath=child::div/div/div[1]/div/p[2]";
    public page_Payees = "https://www.demo.bnz.co.nz/client/payees";
    public h3_Name = "//div[@class='Col-sm-6']/h3";

    // List of Xpath in Modal
    public mdl_Payees = "//div[@class='js-modal-inner Modal-content']";
    public mdl_BtnAdd = "//button[@class='js-submit Button Button--primary']";
    public txt_PayeesName = "//input[@name='apm-name']";
    public txt_Bank = "//div[@class='js-account-number-wrapper row account-row']/input[1]";
    public txt_Branch = "//div[@class='js-account-number-wrapper row account-row']/input[2]";
    public txt_Account = "//div[@class='js-account-number-wrapper row account-row']/input[3]";
    public txt_Suffix = "//div[@class='js-account-number-wrapper row account-row']/input[4]";
    public txt_ForYou = "//div[@class='row from-particulars-row']/input[X]";
    public txt_ForPayee = "//div[@class='row to-particulars-row']/input[X]";
    public div_ErrField = "//div[@class='error-box']/div";
    public div_ErrPayeeName = "//div[@class='tooltip-panel general-tooltip js-tooltip-view']/p";

    // This will verify if you are in Payees Page
    async VerifyIfInPayeesPage(){
        try{
            var actualURL = await this.page.url();
            if(actualURL != this.page_Payees){
                throw new Error("You navigated in wrong page");
            }else{
                console.log("You navigated on Payees Page");
            }
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }else{
                throw new Error(e.stack);
            }
        }
    }

    // This will verify if payees was displayed
    async VerifyPayees(){
        if(!await this.ElementExist(this.ul_PayeesList, 10000)){
            throw new Error("No payees has been displayed");
        }
    }

    // This will get the number of payees
    async GetPayeesCount(){
        var list = await this.FindElements(this.ul_PayeesList, "List of Payees");
        return list.length;
    }

    // This will get the payees list
    async GetPayeesList(){
        try{
            var list = await this.FindElements(this.ul_PayeesList, "Listt of Payees");
            var payees: string[] = [];
            for(var i = 0; i<list.length; i++){
                var payeesNameElement = await this.FindSubElementOnElement(list[i], this.li_PayeesName, "Payee Name");
                var payeesAccountElement = await this.FindSubElementOnElement(list[i], this.li_PayeesAccount, "Payee Account");
                var payeeName = await this.GetLiveElementText(payeesNameElement, "Payee Name");
                var payeeAccount = await this.GetLiveElementText(payeesAccountElement, "Payee Account");
                payees.push(payeeName+"|"+payeeAccount);
            }
            return payees;
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }else{
                throw new Error(e.stack);
            }
        }
    }

    // This will click Add button
    async ClickAddBtn(){
        await this.Click(this.btn_Add, "Add Button");
    }

    // This will verify if modal exist
    async VerifyAddPayeesModal(){
        try{
            if(!await this.ElementExist(this.mdl_Payees)){
                throw new Error("Add new payees modal does NOT exist");
            }
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }else{
                throw new Error(e.stack);
            }
        }
    }

    // This will input details in Add new payees modal
    async FillOutPayeesForm(){
        var smokeSteps = new SmokeSteps(this.page);
        var payeeName = (await smokeSteps.generateRandomString("string", 1)).toUpperCase()
        + "-TEST-" + await smokeSteps.generateRandomString("alphanumeric", 5), 
        bank = await smokeSteps.generateRandomString("number", 2), 
        branch = await smokeSteps.generateRandomString("number", 4), 
        account = await smokeSteps.generateRandomString("number", 7), 
        suffix = await smokeSteps.generateRandomString("number", 2);
        await this.EnterValue(this.txt_PayeesName, payeeName, "Payee Name Field");
        await this.PressEnterKey();
        await this.EnterValue(this.txt_Bank, bank, "Bank");
        await this.EnterValue(this.txt_Branch, branch, "Branch");
        await this.EnterValue(this.txt_Account, account, "Account");
        await this.EnterValue(this.txt_Suffix, suffix, "Suffix");
        await this.PressEnterKey();
        return payeeName+"|"+bank+"-"+branch+"-"+account+"-"+suffix;
    }

    // This will Click Add button in Modal
    async ClickModalAddBtn(){
        await this.Click(this.mdl_BtnAdd, "Modal Add Button");
    }

    // This will verify if success message pops up
    async VerifyIfSuccess(){
        if(!await this.ElementExist(this.span_SuccessMsg, 10000)){
            throw new Error("Unsuccessfully added a new payee");
        }else{
            console.log("Successfully added a new payee");
        }
    }

    // This will verify if new payees has been added
    async VerifyPayeesList(listBefore: any, listAfter: any, expectedPayeeDetails: string){
        try{
            let flag:boolean = false;
            if((listAfter > listBefore) && (listAfter == listBefore+1)){
                console.log("New payee is successfully added");
                var payeeList = await this.FindElements(this.ul_PayeesList, "List of Payees");
                var counter = 0;
                do{
                    var payeeNameElement = await this.FindSubElementOnElement(payeeList[counter], this.li_PayeesName, "Payee Name");
                    var payeeAccountElement = await this.FindSubElementOnElement(payeeList[counter], this.li_PayeesAccount, "Payee Account");
                    var payeeName = await this.GetLiveElementText(payeeNameElement, "Payee Name");
                    var payeeAccount = await this.GetLiveElementText(payeeAccountElement, "Payee Account");
                    if(payeeName == expectedPayeeDetails.split("|")[0] && 
                        payeeAccount == expectedPayeeDetails.split("|")[1]){
                            flag = true;
                            console.log("Newly added payee is in the list");
                    }else{
                        counter++;
                    }
                }while(flag != true);
            }else{
                throw new Error("New payee is unsuccessfully added");
            }
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }else{
                throw new Error(e.stack);
            }
        }
    }

    // This will verify if required field error pops up
    async VerifyIfErrorPopsUp(){
        try{
            if(await this.ElementExist(this.div_ErrField, 1000) &&
            await this.ElementExist(this.div_ErrPayeeName, 1000)){
                var errMsg1 = await this.GetElementText(this.div_ErrField, "Modal Error Message");
                var errMsg2 = await this.GetElementText(this.div_ErrPayeeName, "Required Field");
                console.log(errMsg1);
                console.log(errMsg2);
            }else{
                console.log("No error pops up");
            }
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }else{
                throw new Error(e.stack);
            }
        }
    }

    // Click header name
    async ClickNameHeader(){
        await this.Click(this.h3_Name, "Name Header");
    }

    // This verify if the list is in ascending order
    async VerifyListInOrder(orderType: string, expectedPayeeList: string[]){
        try{
            var actualPayeeList = await this.GetPayeesList();
            var length = actualPayeeList.length;
            actualPayeeList.sort();
            switch(orderType.toLowerCase().trim()){
                case "ascending":
                    for(var i = 0; i<length; i++){
                        console.log("ACTUAL: "+actualPayeeList[i])
                        console.log("EXPECTED: "+expectedPayeeList[i])
                        if(actualPayeeList[i] != expectedPayeeList[i]){
                            throw new Error("Actual and Expected Payee/Account does NOT matched");
                        }
                    }
                    console.log("Payee verified in Ascending Order");
                    break;
                case "descending":
                    for(var i = 0; i<length; i++){
                        console.log("ACTUAL: "+actualPayeeList[length-(i+1)])
                        console.log("EXPECTED: "+expectedPayeeList[i])
                        if(actualPayeeList[actualPayeeList.length-(i+1)] != expectedPayeeList[i]){
                            throw new Error("Actual and Expected Payee/Account does NOT matched");
                        }
                    }
                    console.log("Payee verified in Descending Order");
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
}