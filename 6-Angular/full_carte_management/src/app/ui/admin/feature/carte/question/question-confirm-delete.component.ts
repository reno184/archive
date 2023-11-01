import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ArticleQuestionService} from "../../../../../shared/service/manymany/article-question.service";
import {map, mergeMap, shareReplay} from "rxjs/operators";
import {combineLatest, Observable} from "rxjs";
import {Article} from "../../../../../shared/model/article";
import {Question} from "../../../../../shared/model/question";
import {QuestionService} from "../../../../../shared/service/question.service";
import {ArticleService} from "../../../../../shared/service/article.service";
import {Store} from "@ngrx/store";
import {toogleBlocker} from "../../../../../store/root.action";
import {AuthService} from "../../../../../shared/service/auth.service";

@Component({
    selector: 'app-question-confirm-delete',
    template: `
        <ng-container *ngIf="user$| async as user">
            <ng-container *ngIf="params$| async as params">
                <ng-container *ngIf="question$ | async as question">
                    <h4 class="text-center mb-0">{{question.name}}</h4>
                    <div class="text-center"><small><i>Suppression</i></small></div>
                    <ng-container *ngIf="articles$ | async as items">
                        <ng-container *ngIf="items.length > 0">
                            <ul class="list-group m-2">
                                <li *ngFor="let item of items;  index as i" class="list-group-item d-flex">
                                    <span class="flex-grow-1">{{ item.name}}</span>
                                    <a (click)="onDetach(item,params)"
                                       role="button"><small>Détacher</small></a>
                                </li>
                            </ul>
                        </ng-container>
                        <footer class="d-flex justify-content-around mt-4 mb-2 ">
                            <a [routerLink]="['/', { outlets: { modal: null }}]"
                               queryParamsHandling="preserve">Annuler</a>
                            <ng-container *ngIf="items.length === 0">
                                <a (click)="onDelete(params)" role="button"
                                   class="text-danger">Supprimer</a>
                            </ng-container>
                        </footer>
                    </ng-container>
                </ng-container>
            </ng-container>
        </ng-container>
    `,
    styles: []
})
export class QuestionConfirmDeleteComponent implements OnInit {
    question$: Observable<Question>
    articles$: Observable<Article[]>
    user$: Observable<any>;
    params$: Observable<Params>

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private store: Store<any>,
                private authService: AuthService,
                private articleService: ArticleService,
                private articleQuestionService: ArticleQuestionService,
                private questionService: QuestionService) {

        this.user$ = this.authService.user;
        this.params$ = this.activatedRoute.queryParams.pipe(shareReplay(1));
        this.question$ = this.params$.pipe(mergeMap(params => this.questionService.findById(params)));
        this.articles$ = combineLatest(this.params$, this.question$).pipe(
            mergeMap(([params, question]) =>
                this.articleService.getItems(params['place-id']).pipe(
                    map(items =>
                        items.filter(item =>
                            question.articles && question.articles.includes(item.id))))
            ));

    }

    ngOnInit(): void {
    }

    onDetach(article: Article, params: Params) {
        this.store.dispatch(toogleBlocker({active: true}))
        this.articleQuestionService.detach(article, params['question-id'], params['place-id']).finally(() => this.store.dispatch(toogleBlocker({active: false})));
    }

    onDelete(params: Params) {
        this.store.dispatch(toogleBlocker({active: true}))
        this.questionService.removeItem(params).finally(() => this.store.dispatch(toogleBlocker({active: false})));
        this.router.navigate(['/', {outlets: {modal: null}}], {queryParamsHandling: "preserve"});
    }

}
