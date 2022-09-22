import { Page, errors } from '@playwright/test';
import { Common } from './Common'
import { URL } from '../data/users'

export class LoginPage extends Common{
    readonly page: Page;
    
    constructor(page: Page){
        super(page);
        this.page = page;
    }

    // Set All Selectors into variables
    public txt_Username = '#username-input';
    public txt_Password = '#password-input';
    public btn_Login = '#submit-button';
    public link_ForgotUsername = '#forgot-username-button';
    public link_ForgotPassword = '#forgot-password-button';
    public link_SignUp = '#signup-link';
    public link_ActivateAccount = "#login-remark-link";
    public drp_Language = "//a[@id='locale-selection-dropdown']";
    public h3_loginTitle = '#login-main-title';
    public b_errMsg = "//p[@id='serverError']/b[1]";
    public errMsg = '#username-help-block';

    // Navigate to CWT Page
    async Open(url: string){
        try{
            await this.GoTo(url, "CWT")
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }else{
                throw new Error(e.stack);
            }
        }
    }

    // Enter Login Credentials
    async EnterCredentials(username: string, password: string){
        try{
            await this.Sleep(1000);
            await this.EnterValue(this.txt_Username, username, "Username Field");
            await this.Sleep(1000);
            await this.EnterValue(this.txt_Password, password, "Password Field");
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }else{
                throw new Error(e.stack);
            }
        }
    }

    async ClickLogin(){
        await this.Click(this.btn_Login, "Login Button")
    }
    
    // Navigate to Forgot Username Page
    async ClickForgotUsername(){
        try{
            await this.Click(this.link_ForgotUsername, "Forgot Username Link")
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }else{
                throw new Error(e.stack);
            }
        }
    }

    // Navigate to Forgot Password Page
    async ClickForgotPassword(){
        try{
            await this.Click(this.link_ForgotPassword, "Forgot Pasword Link")
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }else{
                throw new Error(e.stack);
            }
        }
    }

    // Navigate to SignUp Page
    async ClickSignUp(){
        try{
            await this.Click(this.link_SignUp, "Sign Up Page")
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }else{
                throw new Error(e.stack);
            }
        }
    }

    // Change Language
    async SelectLanguage(language: string){
        try{
            await this.SelectFromDropdown(this.drp_Language, "value", language, language);
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }else{
                throw new Error(e.stack);
            }
        }
    }

    // Navigate to registration
    async ClickActivateYourAccount(){
        try{
            await this.Click(this.link_ActivateAccount, "Activate your account link")
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }else{
                throw new Error(e.stack);
            }
        }
    }

    // Verify if you are in Login Page
    async VerifyLogin(username: string, password: string){
        try{
            if(await this.ElementExist(this.b_errMsg), 5000){
                var errMsg = await this.GetElementText(this.b_errMsg, "Error Message");
                console.log(errMsg);
            }else{
                console.log("Successfully Logged In");
                console.log("Username: "+username);
                console.log("Password: "+password);
            }
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }else{
                throw new Error(e.stack);
            }
        }
    }
}