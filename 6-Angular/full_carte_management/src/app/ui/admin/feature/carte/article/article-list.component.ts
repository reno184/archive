import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from "rxjs";
import {AuthService} from "../../../../../shared/service/auth.service";
import {ArticleService} from "../../../../../shared/service/article.service";
import {Article} from "../../../../../shared/model/article";
import {map, mergeMap, startWith} from "rxjs/operators";
import {ArticleQuestionService} from "../../../../../shared/service/manymany/article-question.service";
import {toogleBlocker} from "../../../../../store/root.action";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-article',
    template: `
        <ng-container *ngIf="user$ | async as user">
            <p class="alert alert-primary my-3 border-dark">
                <small>
                    <i class="far fa-question-circle mr-1"></i>
                    Liste des articles à rattacher par la suite à un <strong>group</strong>.(Les bières, les
                    boissons froides...)
                </small>
            </p>
                <ng-container *ngIf="items$| async as items">
                   <ng-container  *ngIf="params$| async as params" >
                       
                 
                <div class="d-flex">
                    <div class="input-group" style="width: 300px">
                        <input type="text" class="form-control" [formControl]="filterString" placeholder="Article">
                        <div class="input-group-append">
                            <span class="input-group-text"><i class="far fa-search"></i></span>
                        </div>
                    </div>
                    <div class="flex-grow-1 text-right">

                        <a [routerLink]="['/', { outlets: { modal: 'modal/modal-article-detail' }}]"
                           queryParamsHandling="preserve" title="article detail" role="button" class="ml-1 text-dark">
                            <i class="far fa-plus-circle mr-1"></i><span class="d-none d-md-inline">Nouveau</span>
                        </a>
                    </div>
                </div>


                       <ul class="list-group mt-3">
                           <ng-container *ngIf="items.length > 0; else noItem">
                               <li *ngFor="let item of items;  index as i" class="list-group-item d-flex">
                                   <div class="flex-grow-1">

                                       <div class="d-flex flex-column">
                                            <div><span>{{item.name}}</span></div>
                                            <small>{{item.desc}}</small>
                                            <div>
                                            <small class="badge badge-light mr-1"
                                                   *ngFor="let question of item.questions | keyvalue">
                                                <a (click)="onDetach(item,question.key,params)" class="mr-1"><i
                                                        class="far fa-times-circle text-dark"></i></a>
                                                <span>{{question.value.name}}</span>
                                                
                                            </small>
                                            <a [routerLink]="['/', { outlets: { modal: 'modal/modal-question' }}]"
                                               [queryParams]="{'article-id' : item.id}" queryParamsHandling="merge"
                                               class="text-dark">
                                                <small><i class="far fa-plus-circle mr-1"></i>Attacher question</small>
                                            </a>
                                            </div>
                                        </div>

                                </div>
                                <a [routerLink]="['/', { outlets: { modal: 'modal/modal-article-detail' }}]"
                                   [queryParams]="{ 'article-id' : item.id }"
                                   queryParamsHandling="merge"
                                   title="article detail" role="button" class="ml-1 text-dark">
                                    <i class="far fa-pencil-alt"></i>
                                </a>
                                <a (click)="onDelete(params,item)"  title="article confirm delete" role="button" class=" text-dark  ml-1">
                                    <i class="far fa-minus-circle"></i>
                                </a>
                            </li>
                        </ng-container>
                        <ng-template #noItem>
                            <li class="list-group-item text-center"><i class="far fa-box-open fa-2x"></i></li>
                        </ng-template>
                    </ul>
                   </ng-container>
                </ng-container>
            </ng-container>
    `,
    styles: []
})
export class ArticleListComponent implements OnInit {
    user$: Observable<any>;
    items$: Observable<Article[]>;
    filterString$: Observable<string>;
    filterString: FormControl;
    params$:Observable<Params>
    constructor(private articleService: ArticleService,
                private activatedRoute: ActivatedRoute,
                private authService: AuthService,
                private store: Store<any>,
                private router : Router,
                private articleQuestionService: ArticleQuestionService) {


        this.user$ = this.authService.user;
        this.params$ = this.activatedRoute.queryParams;

        const i$ = this.params$.pipe(mergeMap(params => this.articleService.getItems(params['place-id'])));

        this.filterString = new FormControl('');
        this.filterString$ = this.filterString.valueChanges.pipe(startWith(''));

        this.items$ = combineLatest(i$, this.filterString$).pipe(
            map(([items, filterString]) => {
                return items.filter(state => {
                    return state.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1
                })
            })
        )
    }


    ngOnInit(): void {
    }

    onDetach(article: Article, questionId: string, params: Params) {
        this.store.dispatch(toogleBlocker({active: true}))
        this.articleQuestionService.detach(article, questionId, params['place-id']).finally(() => this.store.dispatch(toogleBlocker({active: false})));
    }

    onDelete(params: Params, article: Article) {
        if(article.counterBlock >0){
            alert('Désolé cet article est utilisé dans la carte, il ne peut être supprimé')
        }else{
            this.store.dispatch(toogleBlocker({active: true}))
            this.articleService.removeItem(params, article.id).finally(() => this.store.dispatch(toogleBlocker({active: false})));
            this.router.navigate(['/', {outlets: {modal: null}}], {queryParamsHandling: "preserve"});
        }
    }
}
