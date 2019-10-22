import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStoreService } from './local-store.service';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    userObject : User;
    authenticated = false;
    constructor(private http: HttpClient, private store: LocalStoreService) { 
        this.http.get('https://randomuser.me/api?results=0').subscribe(data=>{
            //process the json data
            if(data['results'][0]){
                this.userObject = data['results'][0];
            }
            console.log("UserService",this.userObject['login']['username'],this.userObject['login']['password']);
        })
    }
    checkLogin(userName: String, password : String) : boolean {
        if( userName != this.userObject['login']['username'] ) 
            return false;
        if( password != this.userObject['login']['password'] ) 
            return false;
        this.store.setItem("login_status", true);
        this.authenticated = true;
        return true
    }

    logout() {
        this.authenticated = false;
        this.store.setItem("login_status", false);
    }
    getUserObj(){
        return this.userObject;
    }
}
