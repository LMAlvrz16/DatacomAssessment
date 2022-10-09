import { test } from "@playwright/test";
import { URL } from "../data/users";
import { IntegrationsPage } from "../models/IntegrationsPage";
import { MainPage } from "../models/MainPage";

test('Verify if plugin exist', async ({page}) => {

    const integrationPage = new IntegrationsPage(page);
    const mainPage = new MainPage(page);
    
    // Navigate to Reekoh Page
    await mainPage.Open(URL.Reekoh);

    // Navigate to Integrations Page
    await mainPage.ClickIntegrationsTab();

    // Wait for loading icon to disappear
    await mainPage.WaitForLoadingToDisappear();

    // Validate if plugin type exist then Click it
    await integrationPage.ValidateThenClickPluginType("gateways");

    // Wait for loading icon to disappear
    await integrationPage.WaitForLoadingToDisappear();

    // Validate if plugin exist
    await integrationPage.ValidatePlugin("http gateway");

})