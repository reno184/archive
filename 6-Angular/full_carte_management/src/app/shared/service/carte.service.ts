import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../environments/environment';
import {from, of} from "rxjs";
import {catchError, mergeMap, startWith, timeout} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class CarteService {

    constructor(private httpClient: HttpClient) {
    }

    getCarte(user,placeId) {
        const url = `${environment.url}/getCarte-default?place-id=${placeId}`;
        return from(user.getIdToken(false)).pipe(
            mergeMap((authorization:string) => {
                return this.httpClient.get(`${url}`, {headers: {authorization }}).pipe(
                    timeout(10000),
                    mergeMap(data => of({pending: false, data})))
            }),
            startWith({pending: true}),
            catchError(err => of({pending: false, error: err.message}))
        )
    }
}
