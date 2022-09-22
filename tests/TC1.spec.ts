import { test } from "@playwright/test";
import { URL } from "../data/users";
import { Common } from "../models/Common";
import { HomePage } from "../models/Homepage";
import { PayeesPage } from "../models/PayeesPage";

test('Verify you can navigate to Payees page using the navigation menu', async ({page}) => {
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

    //#endregion */

})