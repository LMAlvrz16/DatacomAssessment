import { test } from "@playwright/test";
import { URL } from "../data/users";
import { Common } from "../models/Common";
import { HomePage } from "../models/Homepage";
import { PayeesPage } from "../models/PayeesPage";

test('Verify payee name is a required field', async ({page}) => {
    const common = new Common(page);
    const homePage = new HomePage(page);
    const payeesPage = new PayeesPage(page);

    //#region start test
    // Open chrome and navigate to demo bnz page
    await common.Open(URL.BNZ);

    // Click Menu
    await homePage.ClickMenu();

    // Click Payees
    await homePage.ClickPayees();

    // Verify if you navigated to payees page
    await payeesPage.VerifyIfInPayeesPage();

    // Get total payees
    var listBefore = await payeesPage.GetPayeesCount();

    // Verify if list of payees was displayed
    await payeesPage.VerifyPayees();

    // Click Add button
    await payeesPage.ClickAddBtn();

    // Click add button inside modal
    await payeesPage.ClickModalAddBtn();

    // verify if modal pops up
    await payeesPage.VerifyAddPayeesModal();

    // Verify error pops up
    await payeesPage.VerifyIfErrorPopsUp();

    // Automatically filled out the form with auto generated method
    var details = await payeesPage.FillOutPayeesForm();

    // Click add button inside modal
    await payeesPage.ClickModalAddBtn();

    // Re-Verify if error pops up
    await payeesPage.VerifyIfErrorPopsUp();

    // Verify if success
    await payeesPage.VerifyIfSuccess();

    // Get total payees after added a new one
    var listAfter = await payeesPage.GetPayeesCount();

    // Re-verify if the new payee has been added
    await payeesPage.VerifyPayeesList(listBefore, listAfter, details);

    //#endregion */
})