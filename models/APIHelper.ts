import { APIRequestContext, Page, errors } from "@playwright/test";
import { SmokeSteps } from "./SmokeSteps";
import { URL } from "../data/users"

export class APIHelper extends SmokeSteps{
    readonly page: Page
     request: APIRequestContext

    constructor(page: Page, request: APIRequestContext){
        super(page);
        this.page = page;
        this.request = request;
    }

    // This will get all users / via id request
    async GetUsersRequest(id:string = "", name:string = ""){
        try{
            var ep_UsersRequest = "", response: any;
            if(id == "" && name == ""){
                ep_UsersRequest = URL.API_URL;
                response = await this.request.get(`${ep_UsersRequest}`,{
                    timeout: 90000,
                    headers: {
                        'content-type': 'application/json',
                    }
                });
            }else{
                ep_UsersRequest = URL.API_URL+"?id="+id;
                response = await this.request.fetch(`${ep_UsersRequest}`,{
                    timeout: 90000,
                    headers: {
                        'content-type': 'application/json',
                    }
                });
            }
            
            const result = await response.json();
            var status = response.status();
            if(status == 200){
                var userID = result[0]['id'];
                var userName = result[0]['name']
                console.log(result);
                if(result.length == 1){
                    if((userID == id) && (userName == name)){
                        console.log("Actual and Expected ID/Name does matched"
                        +"\nActual ID: "+id
                        +"\nExpected ID: "+userID
                        +"\nActual Name: "+name
                        +"\nExpected Name: "+userName);
                    }else{
                        throw new Error("Actual and Expected ID/Name does NOT matched"
                        +"\nActual ID: "+id
                        +"\nExpected ID: "+userID
                        +"\nActual Name: "+name
                        +"\nExpected Name: "+userName);
                    }
                }
            }else{
                throw new Error("API Request was NOT successful");
            }
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }else{
                throw new Error(e.stack);
            }
        }
    }

    // This will post a response
    async PostUserRequest(name:string, username:string, email:string, street:string, suite:string, city:string){
        try{
            var ep_UsersRequest = URL.API_URL+"/";
            this.request = this.page.context().request;
            const response = await this.request.post(`${ep_UsersRequest}`, {
                data: {
                    'name': name,
                    'username': username,
                    'email': email,
                },
                headers: {
                    //'content-type': 'application/json',
                    'host': 'jsonplaceholder.typicode.com',
                    'cache-control': 'no-cache'
                }
            })
            var result = response.json();
            console.log(result);
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }else{
                throw new Error(e.stack);
            }
        }
    }
}