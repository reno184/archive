import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class FetchService {

    constructor(private router : Router, private authService : AuthService) { }

    list<T>(url : string): Promise<T>{
        return new Promise(resolve => {
            this.authService.getToken().then((authorization:string)=>{
                fetch(`${environment.url}/${url}`, {  headers: { authorization  }}).then(resp => {
                    if (resp.ok) {
                        resp.json().then((result:T)=> resolve(result))
                    } else {
                        window.location.replace(resp.status === 401 ? '/401' : '/500')
                    }
                })
            })
        })
    }

    add<T>(url : string, body :T): Promise<string>{
        return new Promise(resolve => {
            this.authService.getToken().then((authorization:string) => {
                fetch(`${environment.url}/${url}`, { method: "POST",     body: JSON.stringify(body), headers: {authorization} }).then(resp => {
                    if (resp.ok) {
                        resp.text().then(newId => resolve(newId))
                    } else {
                        window.location.replace(resp.status === 401 ? '/401' : '/500')
                    }
                })
            })
        })
    }

    update<T>(url:string, id :string, body:T): Promise<void>{
        return new Promise(resolve => {
            this.authService.getToken().then((authorization:string)=>{
                fetch(`${environment.url}/${url}/${id}`, { method: "PUT", body: JSON.stringify(body), headers : { authorization  }   }).then( resp => {
                    if (resp.ok) {
                        resolve()
                    } else {
                        window.location.replace(resp.status === 401 ? '/401' : '/500')
                    }
                })
            })
        })
    }
}
