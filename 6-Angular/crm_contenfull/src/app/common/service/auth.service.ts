import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map, startWith} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private auth: AngularFireAuth, private httpClient: HttpClient) {
    }

    async getToken(refresh): Promise<string> {
        const user = await this.auth.currentUser;
        return user.getIdToken(refresh)
    }

    async getTokenResult(refresh): Promise<any> {
        const user = await this.auth.currentUser;
        return user.getIdTokenResult(refresh)
    }

    async logoff() {
        const authorization = await this.getToken(true);
        await this.httpClient.get(environment.url + `/auth/removeclaim`, {
            headers : {authorization},
            responseType: 'text'
        }).toPromise()
        await this.auth.signOut();
    }

    async loginEmailPassword(email, password) {
        await this.auth.signInWithEmailAndPassword(email, password);
        const authorization = await this.getToken(true);
        await this.httpClient.get(environment.url + `/auth/addclaim`,
            {
                headers : {authorization},
                responseType: 'text'
            }
        ).toPromise();
        const auth_decoded_token_new = await this.getTokenResult(true);
       // console.log('auth_decoded', auth_decoded_token_new);
    };
}
