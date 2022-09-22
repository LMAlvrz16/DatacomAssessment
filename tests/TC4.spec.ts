import { test } from "@playwright/test";
import { URL } from "../data/users";
import { Common } from "../models/Common";
import { HomePage } from "../models/Homepage";
import { PayeesPage } from "../models/PayeesPage";

test('Verify that payees can be sorted by name', async ({page}) => {
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

    // Verify if list of payees was displayed
    await payeesPage.VerifyPayees();

    // Click Add button
    await payeesPage.ClickAddBtn();

    // verify if modal pops up
    await payeesPage.VerifyAddPayeesModal();

    // Automatically filled out the form with auto generated method
    await payeesPage.FillOutPayeesForm();

    // Click add button inside modal
    await payeesPage.ClickModalAddBtn();

    // Verify if success
    await payeesPage.VerifyIfSuccess();

    // Get the list of payees
    var expectedAscendingList = await payeesPage.GetPayeesList();

    // Verify list if in ascending order
    await payeesPage.VerifyListInOrder("ascending", expectedAscendingList);

    // Click header name to make it descending order
    await payeesPage.ClickNameHeader();

    // Get the list of payees
    var expectedDescendingList = await payeesPage.GetPayeesList();

    // Verify list if in descending order
    await payeesPage.VerifyListInOrder("descending", expectedDescendingList);

    //#endregion */
})