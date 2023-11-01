import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {AuthService} from "./auth.service";
import {Reponse} from "../model/reponse";
import {Params} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class ReponseService {

    constructor(private afs: AngularFirestore, public authService: AuthService) {
    }

    getQuestionReponses(params: Params): Observable<Reponse[]> {
        const ref = this.afs.collection<Reponse>('resto/' + params['place-id'] + '/question/' + params['question-id'] + '/answer')
        return ref.valueChanges();
    }

    addItem(questionId: string, name: string, price: number, placeId: string) {
        const id = this.afs.createId();
        const ref = this.afs.doc('resto/' + placeId + '/question/' + questionId + '/answer/' + id);
        return ref.set({id, name: name.charAt(0).toUpperCase() + name.slice(1), price, type : 'answer'})
    }

    removeItem(questionId: string, reponseId: string, placeId: string) {
        const ref = this.afs.doc('resto/' + placeId + '/question/' + questionId + '/answer/' + reponseId);
        return ref.delete()
    }

    updatePrice(questionId: string, reponseId: string, price, placeId: string) {
        const ref = this.afs.doc('resto/' + placeId + '/question/' + questionId + '/answer/' + reponseId);
        return ref.update({price})
    }
}
