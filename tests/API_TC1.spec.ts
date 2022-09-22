import { test } from "@playwright/test";
import { APIHelper } from "../models/APIHelper";

test('Verify GET Users request', async ({page, request}) => {
    const apiHelper = new APIHelper(page, request);

    apiHelper.GetUsersRequest();

})