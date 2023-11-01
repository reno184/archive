import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Article} from "../model/article";
import {Params} from "@angular/router";
import {take} from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class PriceService {


    constructor(private afs: AngularFirestore, public authService: AuthService) {

    }

    test(params) {
        return this.afs.doc('resto/' + params['place-id']).get().pipe(take(1))
    }

    getArticleByBlock(params): Observable<any[]> {
        return this.afs.collection<any>('resto/' + params['place-id'] + '/price', ref => ref.where("blockId", "==", params['block-id'])).valueChanges()
    }

    attachArticle(params: any, item: Article) {
        let key = '';

        if (params['group-id']) {
            key = `${params['group-id']}_${params['block-id']}`
        } else {
            key = `${params['formule-id']}_${params['composition-id']}_${params['block-id']}`
        }
        key += `_${item.id}`;

        // if(params['group-id']){

        //}else{

        //}

        return this.afs.doc('resto/' + params['place-id'] + '/price/' + key).set({
            id: key,
            price: item.price,
            blockId: params['block-id'],
            articleId: item.id,
            rank: 0
        });
    }

    detachArticleFromBlock(params: any, item: Article) {
        let key = 'resto/' + params['place-id'] + '/price/';
        if (params['group-id']) {
            key += `${params['group-id']}_${params['block-id']}`
        } else {
            key += `${params['formule-id']}_${params['composition-id']}_${params['block-id']}`
        }
        key += `_${item.id}`;

        return this.afs.doc(key).delete()
    }

    updateExtra(params, itemAttachedId: string, price: number) {
        let key = 'resto/' + params['place-id'] + '/price/'
        if (params['group-id']) {
            key += `${params['group-id']}_${params['block-id']}`
        } else {
            key += `${params['formule-id']}_${params['composition-id']}_${params['block-id']}`
        }
        key += `_${itemAttachedId}`;

        return this.afs.doc(key).update({price})
    }

    down(params: Params, items: any[], index: number) {
        const itemBefore = items[index];
        const item = items[index + 1];
        const promises = []
        promises.push(this.afs.doc('resto/' + params['place-id'] + '/price/' + itemBefore.url).update({rank: item.rank}))
        promises.push(this.afs.doc('resto/' + params['place-id'] + '/price/' + item.url).update({rank: item.rank - 1}))
        return Promise.all(promises);
    };

    up(params: Params, items: any[], index: number) {
        const itemBefore = items[index - 1];
        const item = items[index];
        const promises = []
        promises.push(this.afs.doc('resto/' + params['place-id'] + '/price/' + itemBefore.url).update({rank: item.rank}))
        promises.push(this.afs.doc('resto/' + params['place-id'] + '/price/' + item.url).update({rank: item.rank - 1}))
        return Promise.all(promises);
    };

}
