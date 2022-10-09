import { ElementHandle, Page } from "@playwright/test";
import { errors } from "@playwright/test";
import fs from 'fs';

export class Common{
    // Set global object variable.
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    // This will navigate to the specified URL.
    async GoTo(url: string, pageName: string){
        try{
            await this.page.goto(url);
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to load the " + pageName+ ".\nMessage: " + e.message);
            }
        }
    }
    
    // Set thread sleep.
    async Sleep(ms: number){
        const promise = await new Promise(resolve => setTimeout(resolve, ms));
        return promise;
    }

    // // Capture browser screen.
    // async ScreenShot(fileName: string, testResult: boolean = true, error: string = ""){
    //     var counter: any;
    //     if(fs.existsSync(this.testDirectory.PassedDirectory)){
    //         counter = fs.readdirSync(this.testDirectory.PassedDirectory).length;
    //         counter = counter + 1;
    //     }
    //     else{
    //         counter =  1;
    //     }
    //     if(testResult){
    //         await this.page.screenshot({ path: this.testDirectory.PassedDirectory + "/" + counter + "_" + 
    //         fileName.replace(" ", "").trim() + ".png" });
    //     }
    //     else{
    //         try{
    //             fs.renameSync(this.testDirectory.PassedDirectory, this.testDirectory.FailedDirectory);
    //             await this.SaveStackTrace(error)
    //             console.log("File moved to failed directory.");
    //         }
    //         catch(err){
    //             throw new Error("Unable to move files to failed directory.\nMessage: " + err);
    //         }
    //         await this.page.screenshot({ path: this.testDirectory.FailedDirectory + "/" + fileName.replace(" ", "").trim() + ".png" });
            
    //     }
    // }

    // // Save stack trace for failed scripts.
    // async SaveStackTrace(error: any){
    //     fs.writeFileSync(this.testDirectory.FailedDirectory + "/StackTrace.txt", error);
    // }
    
    // Wait for element to be visible.
    async WaitForElement(locator: string, locatorName: string, timeOut: number = 0){
        try{
            if(timeOut > 0){
                await this.page.waitForSelector(locator, {state: "visible", timeout: timeOut});
            }
            else{
                await this.page.waitForSelector(locator, {state: "visible", timeout: 90000});
            }
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to find " + locatorName + ".\nMessage: " + e.message);
            }
            else{
                throw new Error("Unable to find " + locatorName + ".\nMessage: " + e.message);
            }
        }
    }

    // This will wait for element state to be hidden.
    async WaitForElementToBeHidden(locator: string, milliSeconds: number = 0){
      try{
        if(milliSeconds > 0){
          await this.page.waitForSelector(locator, { timeout: milliSeconds, state: "detached"});
        }
        else{
          await this.page.waitForSelector(locator, { timeout: 90000, state: 'detached'});
        }
      }
      catch(e){
        if(e instanceof errors.TimeoutError){
          return false;
        }
        else{
          return false;
        }
      }
      return true;
    }

    // Find a particular element.
    async FindElement(locator: string, locatorName: string){
        try{
            var currentValue = await this.page.$(locator);
            console.log(locatorName + " was found.");
            if(currentValue!=null){
                var elementValue =currentValue;
                return elementValue;
            }
            else{
                throw new Error("Unable to find " + locatorName + " as element is null.");
            }

        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to find " + locatorName + ".\nMessage: " + e.message);
            }
            else{
                throw new Error("Unable to find " + locatorName + ".\nMessage: " + e.message);
            }
        }
    }

    // Find number of elements.
    async FindElements(locator: string, locatorName: string){
        try{
            var currentValues = await this.page.$$(locator);
            if(currentValues!=null){
                var elementValues = currentValues;
                console.log(elementValues.length + " " + locatorName + " was found.");
                return elementValues;
            }
            else{
                throw new Error("Unable to find " + locatorName + " as element is null.");
            }
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to find " + locatorName + "\nMessage: " + e.message);
            }
            else{
                throw new Error("Unable to find " + locatorName + "\nMessage: " + e.message);
            }
        }
    }

    // Find number of elements.
    async FindSubElementOnElement(element: ElementHandle, locator: string, locatorName: string){
        try{
            var currentValue = await element.$(locator);
            if(currentValue!=null){
                var elementValue = currentValue;
                console.log(locatorName + " was found.");
                return elementValue;
            }
            else{
                throw new Error("Unable to find " + locatorName + " as element is null.");
            }
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to find " + locatorName + "\nMessage: " + e.message);
            }
            else{
                throw new Error("Unable to find " + locatorName + "\nMessage: " + e.message);
            }
        }
    }

    // Find number of elements.
    async FindSubElementsOnElement(element: ElementHandle, locator: string, locatorName: string){
        try{
            var elementValues = await element.$$(locator);
            console.log(elementValues.length + " " + locatorName + " was found.");
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to find " + locatorName + "\nMessage: " + e.message);
            }
            else{
                throw new Error("Unable to find " + locatorName + "\nMessage: " + e.message);
            }
        }
        return elementValues;
    }

    // Check if element exists.
    async ElementExist(locator: string, timeout: number = 0){
        var isExist = true;
        try{
            if(timeout > 0){
                await this.page.waitForSelector(locator, {state: "visible", timeout: timeout});
            }
            else{
                await this.page.waitForSelector(locator, {state: "visible", timeout: 90000});
            }
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                isExist = false;
            }
            else{
                isExist = false;
            }
        }
        return isExist
    }

    // Check if element enabled
    async ElementEnabled(locator: string){
        var isExist = true;
        try{
            var value = await this.page.$(locator);
            if(value!=null){
                if(!value.isEnabled()){
                    isExist = false;
                }
            }
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                isExist = false;
            }
            else{
                isExist = false;
            }
        }
        return isExist
    }

    // Click element.
    async Click(locator: string, locatorName: string){
        try{
            await this.page.click(locator);
            console.log(locatorName + " was clicked.");
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to click " + locatorName + "\nMessage: " + e.message);
            }
            else{
                throw new Error("Unable to click " + locatorName + "\nMessage: " + e.message);
            }
        }
    }

    // Click existing element.
    async ClickElement(element: ElementHandle, locatorName: string){
        try{
            await element.click();
            console.log(locatorName + " was clicked.");
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to click " + locatorName + "\nMessage: " + e.message);
            }
            else{
                throw new Error("Unable to click " + locatorName + "\nMessage: " + e.message);
            }
        }
    }

    // Fill up the value into the element.
    async FillUpValue(locator: string, inputValue: string, locatorName: string){
        try{
            await this.page.fill(locator, inputValue);
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to fill " + locatorName + "\nMessage: " + e.message);
            }
            else{
                throw new Error("Unable to fill " + locatorName + "\nMessage: " + e.message);
            }
        }
    }

    // Type the value in the element.
    async TypeValue(locator: string, inputValue: string, locatorName: string){
        try{
            await this.page.type(locator, inputValue);
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to type " + locatorName + "\nMessage: " + e.message);
            }
            else{
                throw new Error("Unable to type " + locatorName + "\nMessage: " + e.message);
            }
        }
    }

    // Enter the value in the element field.
    async EnterValue(locator: string, inputValue: string, locatorName: string){
        try{
            await this.Click(locator, locatorName);
            await this.FillUpValue(locator, "", locatorName);
            await this.TypeValue(locator, inputValue, locatorName);
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to enter " + inputValue + " in " + locatorName + "\nMessage: " + e.message);
            }
            else{
                throw new Error("Unable to enter " + inputValue + " in " + locatorName + "\nMessage: " + e.message);
            }
        }
    }

    // Select from dropdown.
    async SelectFromDropdown(locator: string, selectType: string, selectValue: string, locatorName: string){
        try{
            if(selectType.toLowerCase()=="text"){
                await this.page.selectOption(locator, {label: selectValue});
            }
            else if(selectType.toLowerCase()=="value"){
                await this.page.selectOption(locator, {value: selectValue});
            }
            else{
                await this.page.selectOption(locator, {index: parseInt(selectValue)});
            }
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to select " + selectValue + " from " + locatorName + "\nMessage: " + e.message);
            }
            else{
                throw new Error("Unable to enter " + selectValue + " from " + locatorName + "\nMessage: " + e.message);
            }
        }
    }

    // // Get Text from Selected Drop Down
    // async GetTextFromSelectedDropdown(locator: string, locatorName: string){
    //     try{
    //         await this.page.$eval(locator, sel => sel.option)
    //     }catch(e){
    //         if(e instanceof errors.TimeoutError){
    //             throw new Error("Unable to select " + selectValue + " from " + locatorName + "\nMessage: " + e.message);
    //         }
    //         else{
    //             throw new Error("Unable to enter " + selectValue + " from " + locatorName + "\nMessage: " + e.message);
    //         }
    //     }
    // }

    // Get element value via HTML element
    async GetElementTextviaHTML(locator: string, locatorName: string){
        try{
          var textValue = await this.page.$eval<string, HTMLSelectElement>(locator, ele => ele.value); 
          console.log(locatorName + " value: " + textValue);
        }
        catch(e){
          if(e instanceof errors.TimeoutError){
            throw new Error ("Unable to find " + locatorName + ".\nMessage: " + e);
          }
          else{
            throw new Error ("Unable to find " + locatorName + ".\nMessage: " + e);
          }
        }
  
        return textValue.toString().trim();
    }

    // Get label value.
    async GetElementText(locator: string, locatorName: string){
        var textValue:any;
        try{
            var currentValue = await this.page.innerText(locator);

            if(currentValue!=null){
                textValue = currentValue.toString().trim();
            }
            console.log(locatorName + " value: " + textValue);
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
            throw new Error ("Unable to find " + locatorName + ".\nMessage: " + e);
            }
            else{
            throw new Error ("Unable to find " + locatorName + ".\nMessage: " + e);
            }
        }
        return textValue.toString().trim();
    }

    // Get label value from live element
    async GetLiveElementText(element: ElementHandle, locatorName: string){
        var textValue = "";
        try{
            if(element!=null){
                textValue = (await element.innerText()).toString().trim();
                console.log(locatorName + " value: " + textValue);
            }
            else{
                throw new Error (locatorName + " value is null.");
            }
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error ("Unable to find " + locatorName + ".\nMessage: " + e);
            }
            else{
                throw new Error ("Unable to find " + locatorName + ".\nMessage: " + e);
            }
        }
        return textValue;
    }

    // This will get the element attribute value.
    async GetElementValueByAttribute(element: ElementHandle, attributeType: string, elementName: string){
        var attribute: any;
        try{
            if(element!=null){
                attribute = await element.getAttribute(attributeType);
                console.log("Element Attribute: " + attribute.toString().trim());
            }
            else{
                throw new Error (elementName + " value is null.");
            }
        }
        catch(e){
          if(e instanceof errors.TimeoutError){
            throw new Error ("Unable to find the attribute of " + elementName + ".\nMessage: " + e);
          }
          else{
            throw new Error ("Unable to find the attribute of " + elementName + ".\nMessage: " + e);
          }
        }
        return attribute.toString().trim();
    }

    // This will convert number of days to date.
    async ConvertToDate(bookingDays: number = 0){
        var bookingDate = new Date();
        bookingDate.setDate(bookingDate.getDate() + bookingDays);
        return bookingDate.toISOString();
    }

    // Format booking date to month and year.
    async FormatDate(bookingDate: string, formatType: string){
        var formattedDate = "";
        switch(formatType.toLowerCase().trim()){
            case "monthyear":
                var setDate = new Date(bookingDate);
                formattedDate = setDate.toLocaleDateString('en-us', { year:"numeric", month:"long"}).toString();
                break;
        }

        return formattedDate;
    }

    // This will hover on element.
    async ElementHover(locator: string, locatorName: string){
        try{
            var element = await this.page.$(locator);
            if(element!=null){
                await element.scrollIntoViewIfNeeded();
                await element.hover({force: true});
            }
            console.log(locatorName + " was hovered ");
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to hover " + locatorName + "\nMessage: " + e.message);
            }
            else{
                throw new Error("Unable to hover " + locatorName + "\nMessage: " + e.message);
            }
        }
    }

    // This will scroll in to element
    async ScrollIntoElement(locator: string, locatorName: string){
        try{
            var element = await this.page.$(locator);
            if(element!=null){
                await element.scrollIntoViewIfNeeded();
            }
            console.log(locatorName + " was hovered ");
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to hover " + locatorName + "\nMessage: " + e.message);
            }
            else{
                throw new Error("Unable to hover " + locatorName + "\nMessage: " + e.message);
            }
        }
    }

    // Upload file
    async UploadAFile(locator: string, filepath, locatorName:string){
        try{
            await this.page.setInputFiles(locator, filepath)
            console.log("File Uploaded")
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to upload file " + locatorName + "\nMessage: " + e.message);
            }
            else{
                throw new Error("Unable to upload file " + locatorName + "\nMessage: " + e.message);
            }
        }
    }

    // This will press enter key
    async PressEnterKey(){
        await this.page.keyboard.press("Enter");
    }

    // Navigate to BNZ Page
    async Open(url: string){
        try{
            await this.GoTo(url, "BNZ")
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }else{
                throw new Error(e.stack);
            }
        }
    }
}