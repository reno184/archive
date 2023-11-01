import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Article} from "../../../../../shared/model/article";
import {Question} from "../../../../../shared/model/question";
import {first, map, mergeMap, tap} from "rxjs/operators";
import {QuestionService} from "../../../../../shared/service/question.service";
import {AuthService} from "../../../../../shared/service/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ArticleService} from "../../../../../shared/service/article.service";
import {ArticleQuestionService} from "../../../../../shared/service/manymany/article-question.service";
import {Store} from "@ngrx/store";
import {toogleBlocker} from "../../../../../store/root.action";

@Component({
    selector: 'app-question-modal',
    template: `

        <ng-container *ngIf="user$| async as user">
            <ng-container *ngIf="params$| async as params">
                <ng-container *ngIf="article$| async as article">
                    <ng-container *ngIf="items$| async as items">
                        <p class="alert alert-warning mx-2 border-dark">
                            <small>
                                <i class="far fa-question-circle mr-1"></i>
                                Ajouter à un article une question à poser lors de la commande...
                            </small>
                        </p>
                        <ul class="list-group m-2 m-2 border border-dark" style="max-height: 70vh; overflow-y: auto">
                            <ng-container *ngIf="items.length > 0; else noItem">
                                <li *ngFor="let item of items;let index = i" class="list-group-item d-flex">
                                    <div class="form-check">
                                        <input id="a_{{item.id}}" type="checkbox" (change)="onChange(item)"
                                               [checked]="item.uiSelectingRow" class="form-check-input">
                                        <label for="a_{{item.id}}"
                                               class="form-check-label">{{item.name}}</label>
                                    </div>
                                </li>
                            </ng-container>
                            <ng-template #noItem>
                                <li class="list-group-item text-center"><i class="far fa-box-open fa-2x"></i></li>
                            </ng-template>
                        </ul>
                        <footer class="d-flex justify-content-around">
                            <a [routerLink]="['/', { outlets: { modal: null }}]"
                               title="close" [queryParams]="{ 'article-id' : null}" queryParamsHandling="merge">
                                Annuler</a>
                            <a (click)="onValidate( items, article, params)" role="button">Valider</a>
                        </footer>
                    </ng-container>
                </ng-container>
            </ng-container>
        </ng-container>
    `,
    styles: []
})
export class QuestionStockComponent implements OnInit {

    items$: Observable<Question[]>
    article$: Observable<Article>
    user$: Observable<any>
    params$: Observable<Params>

    constructor(private activatedRoute: ActivatedRoute,
                private questionService: QuestionService,
                private authService: AuthService,
                private store: Store<any>,
                private articleService: ArticleService,
                private articleQuestionService: ArticleQuestionService,
                private router: Router
    ) {

        this.user$ = this.authService.user
        this.params$ = this.activatedRoute.queryParams

        this.items$ = this.params$.pipe(mergeMap(params => this.questionService.getItems(params).pipe(tap(items => items.map(item => item.uiSelectingRow = false)))));
        this.article$ = this.params$.pipe(mergeMap(params =>  this.articleService.findById(params)));
    }

    ngOnInit(): void {
    }

    onValidate(items: Question[], article: Article, params: Params) {
        this.store.dispatch(toogleBlocker({active: true}))
        const questions = items.filter(item => item.uiSelectingRow === true)
        this.articleQuestionService.attachQuestion(article, questions, params['place-id']).finally(() => this.store.dispatch(toogleBlocker({active: false})));
        this.router.navigate(['/', {outlets: {modal: null}}], {
            queryParams: {'article-id': null},
            queryParamsHandling: "merge"
        });
    }

    onChange(item: Question) {
        item.uiSelectingRow = !item.uiSelectingRow
    }
}
