import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {BehaviorSubject, from, Observable, of} from "rxjs";
import {catchError, map, mergeMap, startWith, switchMap, tap} from "rxjs/operators";
import {AngularFirestore} from "@angular/fire/firestore";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Rep} from "./model/rep";
import {User} from "./model/user";


@Injectable({
    providedIn: 'root'
})
export class AppService {
    stopperSubject = new BehaviorSubject<boolean>(false);
    loaderSubject = new BehaviorSubject<boolean>(false);

    userState: Observable<any>;

    constructor(private auth: AngularFireAuth,
                private afs: AngularFirestore, private httpClient: HttpClient) {
        this.userState = this.auth.authState.pipe(map(user => {
            return {pending: false, user}
        }), startWith({pending: true}))
    }

    signAnonymous() {
        return this.auth.signInAnonymously();
    }

    signOut(uid:string) {
        const ref = this.afs.doc<any>('anonymous/' + uid);

        ref.delete()
        this.auth.signOut();
    }

    userPlaceToken( placetoken,user:firebase.User){


        return from( user.getIdToken(false)).pipe(
            mergeMap(authorization=> {
                return this.httpClient.get(`${environment.url}/authPlace-default?place-token=${placetoken}`, {
                    headers: {'authorization': authorization},
                    responseType: 'text'
                }).pipe(mergeMap(data => {
                    return of({pending: false, data});
                }));
            }),
            startWith({pending: true} as Rep),
            catchError(err => {
                return of({pending: false, error: err.error});
            })
        );
    }

    watchUserDB(uid: string): Observable<any> {
        const ref = this.afs.doc<User>('/anonymous/' + uid);
        return ref.valueChanges().pipe(map(data => {
            return {pending: false, data}
        }), startWith({pending: true}))
    }

    getPlaceInfo(placeid: string, user: firebase.User) {
        return from(user.getIdToken(false)).pipe(
            mergeMap(authorization => {
                return this.httpClient.get(environment.url + '/getPlaceInfo-default?place-id=' + placeid, {headers: {authorization}}).pipe(
                    mergeMap(data => {
                        return of({pending: false, data});
                    }))
            }),
            startWith({pending: true} as Rep),
            catchError(err => {
                return of({pending: false, error: err.message});
            })
        )

    }

    getPlaceName(placeid: string) {
        console.log('call getPlaceName', placeid)
        return this.httpClient.get(environment.url + '/getPlaceName-default?place-id=' + placeid).pipe(
            mergeMap(data => {
                return of({pending: false, data});
            }),
            startWith({pending: true} as Rep),
            catchError(err => {

                console.log(err)
                return of({pending: false, error: err.error});
            })
        )
    }

    getCarte(user: firebase.User): Observable<Rep> {
        return from(user.getIdToken(false)).pipe(
            switchMap(authorization => {
                return this.httpClient.get(`${environment.url}/getCarte-default`, {headers: {authorization}}).pipe(map(data => {
                    return {
                        pending: false,
                        data
                    }
                }))

            }),
            startWith({pending: true}),
            catchError(err => of({pending: false, error: err.error}))
        )
    }

    watchInfoBasket(user) {
        const ref = this.afs.collection('/anonymous/' + user.uid + '/orders');
        return ref.valueChanges().pipe(tap(x => x))
    }

    postOrder(order: any, user: firebase.User) {
        return from(user.getIdToken(false)).pipe(
            mergeMap(authorization => {
                return this.httpClient.post(environment.url + '/orderOnAuth-default?order-token=' + order.token, order.body, {
                    headers: {authorization},
                    responseType: 'text'
                }).pipe(
                    mergeMap(() => {
                        return of({pending: false, data: true});
                    }))
            }),
            startWith({pending: true} as Rep),
            catchError(err => {
                console.log(err)
                return of({pending: false, error: err.error});
            })
        )
    }
}
