import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "@firebase/app-compat";
import {User} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private auth: AngularFireAuth, private router : Router) { }

    async getToken(): Promise<string> {
        return new Promise(resolve =>{
            this.auth.currentUser.then(user =>{
                if(user){
                    user.getIdToken(true).then(token=>{
                        resolve(token)
                    })
                }else{
                    window.location.replace('/401')
                }
            })
        })

    }

    async login(): Promise<User> {
        return new Promise( (resolve) => {
            /*     this.auth.signInWithEmailAndPassword('renaud.heddegmail.com', 'jaijaijai').then(user=>{
                resolve(user.user)
            })*/
            this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(user=>{
                resolve(user.user)
            })
        })
    }
    async logOut(): Promise<void> {
        return new Promise( (resolve) => {
            this.auth.signOut().then(()=>{
                resolve()
            })
        })
    }
}
