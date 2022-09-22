import { test } from "@playwright/test";
import { URL } from "../data/users";
import { Common } from "../models/Common";
import { HomePage } from "../models/Homepage";
import { PaymentPage } from "../models/PaymentPage";

test(' Navigate to Payments page', async ({page}) => {
    const common = new Common(page);
    const homePage = new HomePage(page);
    const paymentPage = new PaymentPage(page);

    //#region start test
    // Open chrome and navigate to demo bnz page
    await common.Open(URL.BNZ);

    // Get accounts balance
    var balancesBefore = await homePage.GetAllAccountBalance();

    // Click Menu
    await homePage.ClickMenu();

    // Click Pay or Transfer
    await homePage.ClickPayOrTransfer();

    // Verify pay or transfer modal
    await paymentPage.VerifyPaymentModalExist();

    // Click choose account of From
    await paymentPage.ClickFrom();

    // Verify if accounts were displayed
    await paymentPage.VerifyFromAccounts();

    // Choose accounts depends on type (select,search)
    // Choices for accounts: bills, everyday, savings, platinum visa
    // activity would be "from" and "to"
    await paymentPage.ChooseAccounts("select", "everyday", "from");

    // Click choose account of To
    await paymentPage.ClickTo();

    // Verify if accounts were displayed
    await paymentPage.VerifyToAccounts();

    // Choose accounts depends on type (select,search)
    // Choices for accounts: bills, everyday, savings, platinum visa
    // activity would be "from" and "to"
    await paymentPage.ChooseAccounts("select", "bills", "to");

    // Enter amount value
    await paymentPage.EnterAmount("500");

    // Click Transfer
    await paymentPage.ClickTransferBtn();

    // Verify if success msg pops up
    await paymentPage.VerifyTransferSuccess();

    // Get accounts balance
    var balancesAfter = await homePage.GetAllAccountBalance();

    // Verify if amount has been transfered
    await homePage.VerifyIfTransactionSuccessful(balancesBefore, balancesAfter);

    //#endregion */
})