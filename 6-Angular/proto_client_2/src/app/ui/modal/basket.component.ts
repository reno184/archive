import {Component, OnInit} from '@angular/core';
import {AppConstante} from "../../shared/app.constante";
import {Observable} from "rxjs";
import {AppService} from "../../shared/app.service";
import {filter, mergeMap} from "rxjs/operators";
import * as moment from 'moment'

@Component({
    selector: 'app-basket',
    template: `

        <ng-container *ngIf="basket$ | async as baskets">
            <ng-container *ngIf="baskets.length>0;else noBasket">
                <div style="display: flex; flex-direction: column" *ngFor="let basket of baskets | keyvalue">
                    {{basket.value.data.name}}
                    <small>{{getStatus(basket.value.status)}}, {{formatDate(basket.value.ordered)}}</small>
                </div>
            </ng-container>
            <ng-template #noBasket>
                <div style="text-align: center;margin: 20px 0">
                    <div style="margin-bottom: 10px">Panier vide</div>
                    <br>
                    <i class="far fa-box-open fa-2x"></i>
                </div>
            </ng-template>
        </ng-container>

    `,
    styles: []
})
export class BasketComponent implements OnInit {
    userState$: Observable<any>
    basket$: Observable<any>

    constructor(private appConstante: AppConstante,
                private appService: AppService) {
    }

    ngOnInit(): void {
        this.basket$ = this.appService.userState.pipe(filter(state => !!state && !!state.user),
            mergeMap(state => this.appService.watchInfoBasket(state.user)))
    }

    getStatus(key) {
        return key ? this.appConstante.typeStatus[key] : this.appConstante.typeStatus[0];
    }

    formatDate(date: any) {
        moment.locale('fr');
        return moment(date.toDate()).fromNow();
    }

}
