import { Page, errors } from '@playwright/test';
import { Common } from './Common'

export class IntegrationsPage extends Common{
    readonly page: Page;
    
    constructor(page: Page){
        super(page);
        this.page = page;
    }

    // List of xpaths
    public li_PluginType = "//div[@class='nav nav-pills nav-stacked']/li[X]";
    public div_PluginSection = "//div[@class='plugin-section']/div";
    public div_Plugin = "xpath=child::div";
    public div_LoadingIcon = "//div[@class='loading']";

    async ValidateThenClickPluginType(pluginType: string){
        try{
            switch(pluginType.toLocaleLowerCase().trim()){
                case "all":
                    if(await this.ElementExist(this.li_PluginType.replace("X","2"), 10000)){
                        await this.Click((this.li_PluginType.replace("X","2")), "Plugin Type All");
                    }else{
                        throw new Error("Plugin Type all does NOT exist");
                    }
                    break;
                case "connectors":
                    if(await this.ElementExist(this.li_PluginType.replace("X","3"), 10000)){
                        await this.Click((this.li_PluginType.replace("X","3")), "Plugin Type Connectors");
                    }else{
                        throw new Error("Plugin Type connectors does NOT exist");
                    }
                    break;
                case "gateways":
                    if(await this.ElementExist(this.li_PluginType.replace("X","4"), 10000)){
                        await this.Click((this.li_PluginType.replace("X","4")), "Plugin Type gateways");
                    }else{
                        throw new Error("Plugin Type gateways does NOT exist");
                    }
                    break;
                case "services":
                    if(await this.ElementExist(this.li_PluginType.replace("X","5"), 10000)){
                    await this.Click((this.li_PluginType.replace("X","5")), "Plugin Type services");
                    }else{
                        throw new Error("Plugin Type services does NOT exist");
                    }
                    break;
                case "storages":
                    if(await this.ElementExist(this.li_PluginType.replace("X","6"), 10000)){
                        await this.Click((this.li_PluginType.replace("X","6")), "Plugin Type storages");
                    }else{
                        throw new Error("Plugin Type storages does NOT exist");
                    }
                    break;
                case "streams":
                    if(await this.ElementExist(this.li_PluginType.replace("X","7"), 10000)){
                        await this.Click((this.li_PluginType.replace("X","7")), "Plugin Type streams");
                    }else{
                        throw new Error("Plugin Type streams does NOT exist");
                    }
                    break;
                case "inventory syncs":
                    if(await this.ElementExist(this.li_PluginType.replace("X","8"), 10000)){
                        await this.Click((this.li_PluginType.replace("X","8")), "Plugin Type inventory syncs");
                    }else{
                        throw new Error("Plugin Type inventory syncs does NOT exist");
                    }
                    break;
                case "exception loggers":
                    if(await this.ElementExist(this.li_PluginType.replace("X","9"), 10000)){
                        await this.Click((this.li_PluginType.replace("X","9")), "Plugin Type exception loggers");
                    }else{
                        throw new Error("Plugin Type exception loggers does NOT exist");
                    }
                    break;
                case "loggers":
                    if(await this.ElementExist(this.li_PluginType.replace("X","10"), 10000)){
                        await this.Click((this.li_PluginType.replace("X","10")), "Plugin Type loggers");
                    }else{
                        throw new Error("Plugin Type loggers does NOT exist");
                    }
                    break;
                case "channels":
                    if(await this.ElementExist(this.li_PluginType.replace("X","11"), 10000)){
                        await this.Click((this.li_PluginType.replace("X","11")), "Plugin Type channels");
                    }else{
                        throw new Error("Plugin Type channels does NOT exist");
                    }
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

    async ValidatePlugin(plugin: string){
        try{
            var flag = false;
            var counter = 0;
            var sectionList = await this.FindElements(this.div_PluginSection,"Plugin Section List");
            for(var i = 0; i<sectionList.length; i++){
                console.log("PLUGIN SECTION "+i+1);
                var pluginList = await this.FindSubElementsOnElement(sectionList[i], this.div_Plugin, "Plugin List");
                for(var x = 0; x<pluginList.length; x++){
                    var pluginElement = await this.FindSubElementOnElement(pluginList[x], this.div_Plugin, "Plugin");
                    var pluginName = await this.GetLiveElementText(pluginElement, "Plugin Name");
                    if(pluginName.toLowerCase().trim() == plugin){
                        flag = true;
                        counter++;
                    }
                }
            }
            if(flag == false){
                throw new Error("Plugin "+plugin+" does NOT exist");
            }else{
                if(counter > 1){
                    throw new Error("Plugin "+plugin+" does exist but has duplicate")
                }else{
                    console.log("Plugin "+plugin+" does exist");
                }
            }
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }else{
                throw new Error(e.stack);
            }
        }
    }

    async WaitForLoadingToDisappear(){
        await this.WaitForElementToBeHidden(this.div_LoadingIcon);
        console.log("Loading disppeared");
    }
}