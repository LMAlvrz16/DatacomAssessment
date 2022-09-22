import { test } from "@playwright/test";
import { APIHelper } from "../models/APIHelper";

test('Verify GET User request by ID', async ({page, request}) => {
    const apiHelper = new APIHelper(page, request);

    apiHelper.GetUsersRequest("8", "Nicholas Runolfsdottir V");

})