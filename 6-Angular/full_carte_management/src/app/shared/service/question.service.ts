import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Question} from "../model/question";
import {Params} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    constructor(private afs: AngularFirestore, public authService: AuthService) {
    }

    findById(params: Params): Observable<Question> {
        const ref = this.afs.doc<Question>('resto/' + params['place-id'] + '/question/' + params['question-id']);
        return ref.valueChanges();
    }

    getItems(params: Params): Observable<Question[]> {
        const ref = this.afs.collection<Question>('resto/' + params['place-id'] + '/question/', ref => ref.orderBy('name'));
        return ref.valueChanges();
    }

    addItem(name: string, placeId: string) {
        const id = this.afs.createId();
        const ref = this.afs.collection<Question>('resto/' + placeId + '/question')
        return ref.doc(id).set({id, name: name.charAt(0).toUpperCase() + name.slice(1), counter: 0, articles: [], type: 'question'});
    }

    removeItem(params: Params) {
        return this.afs.doc('resto/' + params['place-id'] + '/question/' + params['question-id']).delete()
    }

    updateItemName(id: string, name: string, placeId: string) {
        return this.afs.doc('resto/' + placeId + '/question/' + id).update({name: name.charAt(0).toUpperCase() + name.slice(1)});
    }


}
