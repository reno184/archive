import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {from, Observable, of} from "rxjs";
import {Stat} from "../model/stat";
import {environment} from "../../../environments/environment";
import {catchError, mergeMap, startWith, tap, timeout} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class StatService {

    constructor(private afs: AngularFirestore,private httpClient: HttpClient) {
    }

    getStat(placeId: string): Observable<Stat[]> {
        const ref = this.afs.collection<Stat>('resto/' + placeId + '/stat', ref => ref.orderBy('rank'));
        return ref.valueChanges();
    }
    refresh(user,placeId): Observable<boolean>{
        const url = `${environment.url}/calcCounter-default?place-id=${placeId}`;
        return from(user.getIdToken(false)).pipe(
            mergeMap((authorization:string) => {
                return this.httpClient.get(`${url}`, {headers: { authorization },'responseType': 'text'}).pipe(
                    mergeMap(()=> of(false)))
            }),
            startWith(true)
        )
    }
}
