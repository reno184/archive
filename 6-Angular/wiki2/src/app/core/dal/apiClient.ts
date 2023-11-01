import {AngularFirestore, QueryFn, QuerySnapshot} from "@angular/fire/compat/firestore";

import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {delay} from "rxjs/operators";

@Injectable()
export class ApiClientService {
    constructor(private afs: AngularFirestore) {

    }
    list = <T>(path : string, query? : QueryFn): Promise<QuerySnapshot<T>> =>{
        return new Promise((resolve, reject) => {
            this.afs.collection(path, query).get().pipe(delay(environment.useEmulators ? 1000 : 1)).toPromise().then((rep) => {
                resolve(rep as QuerySnapshot<T>)
            }).catch((err:Error) => {
                reject(err)
            })
        })
    }

    add = <T>(path : string, value: T): Promise<{id : string, data :T}> =>{
        return new Promise((resolve, reject) => {
            const id = this.afs.createId();
            this.afs.collection(path).doc(id).set(value).then(() => {
                setTimeout(()=>{
                    resolve({id, data : value})
                },1000)

            }).catch((err:Error) => {
                reject(err)
            })
        })
    }

    delete = (path : string, id : string): Promise<string> =>{
        return new Promise((resolve, reject) => {
            this.afs.collection(path).doc(id).delete().then(() => {
                resolve(id)
            }).catch((err:Error) => {
                reject(err)
            })
        })
    }
}
