import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from "rxjs";
import {Article} from "../../shared/model/article";
import {AuthService} from "../../shared/service/auth.service";
import {ArticleService} from "../../shared/service/article.service";
import {GroupService} from "../../shared/service/group.service";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {map, mergeMap, shareReplay, startWith, tap} from "rxjs/operators";
import {toogleBlocker} from "../../store/root.action";
import {FormuleService} from "../../shared/service/formule.service";
import {FormControl} from "@angular/forms";
import {PriceService} from "../../shared/service/price.service";

@Component({
    selector: 'app-formule-stock',
    template: `
        <ng-container *ngIf="user$| async as user">
            <ng-container *ngIf="params$| async as params">
                    <ng-container *ngIf="itemsf$| async as items">
                        <div class="mx-2 bg-light p-2 border border-dark">
                            <div class="input-group">
                                <input type="text" class="form-control" [formControl]="filterString"
                                       aria-label="filter">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-search"></i></span>
                                </div>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="filterAttach"
                                       [formControl]="filterAttach" id="i2" value="all">
                                <label class="form-check-label" for="i2">Tous</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="filterAttach"
                                       [formControl]="filterAttach" id="i1" value="true">
                                <label class="form-check-label" for="i1">Attaché</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="filterAttach"
                                       [formControl]="filterAttach" id="i2" value="false">
                                <label class="form-check-label" for="i2">Détaché</label>
                            </div>
                        </div>
                        <ul class="list-group m-2 m-2 border border-dark" style="max-height: 70vh; overflow-y: auto">
                            <ng-container *ngIf="items.length > 0; else noItem">
                                <li *ngFor="let item of items;index as i" class="list-group-item">
                                    <div class="form-check">
                                        <input id="a_{{item.id}}" type="checkbox"
                                               (change)="onChange($event,params, item)"
                                               [checked]="item.uiSelectingRow" class="form-check-input">
                                        <label for="a_{{item.id}}"
                                               class="form-check-label">{{item.name}}<br><small>{{item.desc}}</small>
                                        </label>
                                        <div *ngIf="item.uiSelectingRow && !item.uiEditingRow">
                                            <small>Extra : {{ item.price  | number:'1.2-2' }}</small>
                                            <a (click)="onEditPrice(item)" title="Attacher" class="ml-2"><small><i>Modifier
                                            </i></small>
                                            </a>
                                        </div>
                                        <div *ngIf="item.uiSelectingRow && item.uiEditingRow">
                                            <input type="number" id="price_{{i}}" min="0" step="0.05"
                                                   class="border border-dark" value="{{item.price}}">
                                            <a (click)="onSaveEditPrice(params,item,i)"
                                               title="sauvegarder" class="mx-1"><i
                                                    class="far fa-check-circle text-dark"></i></a>
                                            <a (click)="onCancelPrice(item)" title="annuler modif exra"><i
                                                    class="far fa-times-circle text-dark"></i></a>
                                        </div>
                                    </div>
                                </li>
                            </ng-container>
                            <ng-template #noItem>
                                <li class="list-group-item text-center"><i class="far fa-box-open fa-2x"></i></li>
                            </ng-template>
                        </ul>

                        <footer class="text-center">
                            <a [routerLink]="['/', { outlets: { modal: null }}]"
                               [queryParams]="{ 'formule-id' : null, 'composition-id' : null, 'block-id' : null, 'group-id': null }"
                               queryParamsHandling="merge"
                               title="close">Annuler</a>
                        </footer>
                    </ng-container>
                </ng-container>
            </ng-container>
 
    `,
    styles: []
})
export class ModalPriceComponent implements OnInit {
    itemsf$: Observable<any[]>;
    user$: Observable<any>;
    params$: Observable<Params>;

    filterString$: Observable<string>;
    filterString: FormControl;
    filterAttach$: Observable<string>;
    filterAttach: FormControl;

    constructor(private authService: AuthService,
                private formuleService: FormuleService,
                private articleService: ArticleService,
                private groupService: GroupService,
                private priceService : PriceService,
                private store: Store<any>,
                private activatedRoute: ActivatedRoute,
                private router: Router) {


        this.user$ = this.authService.user;
        this.params$ = this.activatedRoute.queryParams;

        this.filterString = new FormControl('');
        this.filterString$ = this.filterString.valueChanges.pipe(startWith(''));

        this.filterAttach = new FormControl('all');
        this.filterAttach$ = this.filterAttach.valueChanges.pipe(startWith('all'));

        const itemAll$ = this.params$.pipe(
            mergeMap(params => this.articleService.getItems(params['place-id']).pipe(
                tap(items => {
                    return items.map(item => {
                        item.uiSelectingRow = false
                        item.itemAttachedId = null
                        item.price = 0
                        return item;
                    })
                }))), shareReplay(1));

        const itemsAttached$ = this.activatedRoute.queryParams.pipe(mergeMap(params => this.priceService.getArticleByBlock(params)));

        const items$ = combineLatest(itemAll$, itemsAttached$).pipe(
            map(([itemsAll, itemsAttached]) => {
                return itemsAll
                    .map(item => {
                        item.uiSelectingRow = false;
                        item.price = 0;
                        item.itemAttachedId = null;
                        itemsAttached.forEach(itemAttached => {
                            if (itemAttached.articleId == item.id) {
                                item.uiSelectingRow = true;
                                item.price = itemAttached.price;
                                item.itemAttachedId = itemAttached.id;
                            }
                        })
                        return item;
                    })
            }));


        this.itemsf$ = combineLatest(items$, this.filterString$, this.filterAttach$).pipe(
            map(([items, filterString, filterAttach]) => {
                return items.filter(state => {

                    return state.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1 &&
                        (filterAttach === 'all' ||
                            (filterAttach === 'true' && state.uiSelectingRow) ||
                            (filterAttach === 'false' && !state.uiSelectingRow))
                })
            })
        )

    }

    ngOnInit(): void {

    }

    onChange(e, params, item: Article) {
        const r = e.target as HTMLInputElement

        this.store.dispatch(toogleBlocker({active: true}))
        if (r.checked && item.id) {
            this.priceService.attachArticle(params, item).finally(() => {
                setTimeout(() => {
                    this.store.dispatch(toogleBlocker({active: false}));
                }, 1000)
            });
        } else {
            this.priceService.detachArticleFromBlock(params, item).finally(() => {
                {
                    setTimeout(() => {
                        this.store.dispatch(toogleBlocker({active: false}));
                    }, 1000)
                }
            });
        }
    }

    onEditPrice(item: Article) {
        item.uiEditingRow = true
    }

    onSaveEditPrice(params, item:Article, index:number) {
        const input = document.getElementById('price_' + index) as HTMLInputElement
        this.store.dispatch(toogleBlocker({active: true}))
        this.priceService.updateExtra(params,  item.id, parseFloat(input.value)).finally(() => {
            this.store.dispatch(toogleBlocker({active: false}))
            item.uiEditingRow = false
        });
    }

    onCancelPrice(item: Article) {
        item.uiEditingRow = false
    }
}
