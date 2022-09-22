import { Page } from "@playwright/test";
import { Common } from "./Common";

export class SmokeSteps extends Common{
    readonly page: Page;

    constructor(page:Page){
        super(page);
    }

    // This generate random string or alphanumeric string.
    async generateRandomString(stringType: string, stringSize: number){
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var numbers = "1234567890";
        var numbersLength = numbers.length;
        var charactersLength = characters.length;
        if(stringType.toLocaleLowerCase().trim() == "string"){
            for(var i = 0; i < stringSize; i++){
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
        }
        else if(stringType.toLocaleLowerCase().trim() == "number"){
            for(var i = 0; i < stringSize; i++){
            result += numbers.charAt(Math.floor(Math.random() * numbersLength));
            }
        }
        else{
            var stringLength = (stringSize - Math.floor(stringSize/2)) + 1;
            var numberLength = Math.floor(stringSize/2) - 1;
            for(var a = 0; a < stringLength; a++){
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            for(var b = 0; b < numberLength; b++){
            result += numbers.charAt(Math.floor(Math.random() * numbersLength));
            }
        }
        return result;
    } 
}