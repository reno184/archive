import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/service/auth.service";
import {ActivatedRoute, Params} from "@angular/router";
import {combineLatest, Observable} from "rxjs";
import {map, mergeMap, shareReplay} from "rxjs/operators";
import {ArticleService} from "../../shared/service/article.service";
import {PriceService} from "../../shared/service/price.service";

@Component({
  selector: 'app-modal-sort',
  template: `
      <ng-container *ngIf="user$| async as user">
          <ng-container *ngIf="params$| async as params">
              <h3 class="text-center">Trier</h3>
              <ng-container *ngIf="items$| async as items">
                  <ul class="list-group m-2 border border-dark" style="max-height: 70vh; overflow-y: auto">
                      <ng-container *ngIf="items.length > 0; else noItem">
                          <li *ngFor="let item of items;index as i" class="list-group-item d-flex">
                              <div class="flex-grow-1">
                                  {{item.name}}<br><small>{{item.desc}}</small>
                              </div>
                              <a (click)="onUp(params,items, i)" class="mr-1" [ngClass]="{ 'text-light' : i ===0 }"><i
                                      class="far fa-arrow-circle-up"></i></a>
                              <a (click)="onDown(params,items, i)" [ngClass]="{ 'text-light' : i ===items.length-1}"><i
                                      class="far fa-arrow-circle-down"></i></a>
                          </li>
                      </ng-container>
                      <ng-template #noItem>
                          <li class="list-group-item text-center"><i class="far fa-box-open fa-2x"></i></li>
                      </ng-template>
                  </ul>
              </ng-container>
              <footer class="text-center">
                  <a [routerLink]="['/', { outlets: { modal: null }}]"
                     [queryParams]="{ 'formule-id' : null, 'composition-id' : null, 'block-id' : null, 'group-id': null }"
                     queryParamsHandling="merge"
                     title="close">Annuler</a>
              </footer>
          </ng-container>
      </ng-container>

  `,
  styles: [
  ]
})
export class ModalSortComponent implements OnInit {
  user$: Observable<any>;
    params$: Observable<Params>;
    items$: Observable<any[]>;
  constructor(private authService: AuthService,private activatedRoute: ActivatedRoute  , private articleService: ArticleService,  private priceService : PriceService) {

    this.user$ = this.authService.user;
    this.params$ = this.activatedRoute.queryParams.pipe(shareReplay(1));

      const itemAttached$ = this.params$.pipe(mergeMap(params => this.priceService.getArticleByBlock(params)));
      const itemAll$ = this.params$.pipe(mergeMap(params => this.articleService.getItems(params['place-id'])));
    this.items$ = combineLatest(itemAll$, itemAttached$).pipe(
        map(([itemAll, itemsAttached]) => {
            const temp = []
            itemAll.forEach(article => {
                itemsAttached.forEach(attached => {
                    if (attached.articleId === article.id) {
                        temp.push({
                            name: article.name,
                            desc: article.desc,
                            url: attached.id,
                            rank: attached.rank
                        })
                    }
                })

            })
            return temp.sort(function (a, b) {
                return a.rank < b.rank ? -1 : 1;
            })
        })
    );


  }

    ngOnInit(): void {
    }

    onUp(params: Params, items: any[], i: number) {
        this.priceService.up(params, items, i)
    }

    onDown(params: Params, items: any[], i: number) {
        this.priceService.down(params, items, i)
    }
}
