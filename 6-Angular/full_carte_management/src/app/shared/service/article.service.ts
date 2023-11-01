import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {Article} from "../model/article";
import {Params} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    constructor(private afs: AngularFirestore, public authService: AuthService) {
    }

    findById(params): Observable<Article> {
        const ref = this.afs.doc<Article>('resto/' + params['place-id'] + '/article/' + params['article-id']);
        return ref.valueChanges();
    }

    getItems(placeId: string): Observable<Article[]> {
        const ref = this.afs.collection<Article>('resto/' + placeId + '/article', ref => ref.orderBy('name'));
        return ref.valueChanges();
    }

    removeItem(params: Params, id:string) {
        const ref = this.afs.doc<Article>('resto/' + params['place-id'] + '/article/' + id);
        return ref.delete();
    }

    upsertItem(params, name: string, desc: string) {

        if (params['article-id']) {
            return this.afs.doc('resto/' + params['place-id'] + '/article/' + params['article-id']).update({
                name: name.charAt(0).toUpperCase() + name.slice(1),
                desc
            })
        }else{
            const newId =  Date.now().toString();
            return this.afs.doc('resto/' + params['place-id'] + '/article/' +newId).set( {
                name: name.charAt(0).toUpperCase() + name.slice(1),
                desc,
                id : newId,
                counter: 0,
                counterBlock:0
            })
        }
    }
}
