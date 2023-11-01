import {Injectable} from '@angular/core';
import {Article} from "../../model/article";
import {Question} from "../../model/question";
import {AngularFirestore} from "@angular/fire/firestore";
import {AuthService} from "../auth.service";
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class ArticleQuestionService {

    constructor(private afs: AngularFirestore, public authService: AuthService) {
    }

    attachQuestion(article: Article, newQuestions: Question[], placeId: string) {
        const promises = []
        const ref = this.afs.collection('resto/' + placeId + '/article').doc(article.id);
        const questions = article.questions || {};
        let counter = article.counter || 0;
        newQuestions.forEach(newQuestion => {
            if (questions[newQuestion.id] === undefined) {
                promises.push(this.afs.collection('resto/' + placeId + '/question').doc(newQuestion.id).update({articles: firebase.default.firestore.FieldValue.arrayUnion(article.id)}))
                counter += 1;
                questions[newQuestion.id] = {id: newQuestion.id, name: newQuestion.name}
            }
        })
        promises.push(ref.update({counter, questions}))

        return Promise.all(promises)
    }

    detach(article: Article, questionId: string, placeId: string) {

        const promises = []
        const ref = this.afs.collection('resto/' + placeId + '/article').doc(article.id);
        const questions = article.questions || {}
        delete questions[questionId]
        promises.push(this.afs.collection('resto/' + placeId + '/question').doc(questionId).update({articles: firebase.default.firestore.FieldValue.arrayRemove(article.id)}))
        promises.push(ref.update({counter: firebase.default.firestore.FieldValue.increment(-1), questions}))
        return Promise.all(promises)
    }
}
