import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {from, of} from "rxjs";
import {catchError, mergeMap, startWith, timeout} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestoService {

  constructor(private httpClient: HttpClient) { }

    getItems(user: firebase.default.User) {
        const url = `${environment.url}/getRestoList-default`;
        return from(user.getIdToken(false)).pipe(
            mergeMap((authorization:string) => {
                return this.httpClient.get(`${url}`, {headers: {authorization}}).pipe(
                    timeout(10000),
                    mergeMap(data => of({pending: false, data})))
            }),
            startWith({pending: true}),
            catchError(err => of({pending: false, error: err.message}))
        )
    }
}
