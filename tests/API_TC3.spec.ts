import { test } from "@playwright/test";
import { APIHelper } from "../models/APIHelper";

test('Verify POST Users request ', async ({page, request}) => {
    const apiHelper = new APIHelper(page, request);

    apiHelper.PostUserRequest("test","Test01","Test01@gmail.com","Test Street", "Test Suite", "Test City");

})