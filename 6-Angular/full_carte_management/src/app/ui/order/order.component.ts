import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, mergeMap} from "rxjs/operators";
import {Observable} from "rxjs";
import * as moment from 'moment'
import {AuthService} from "../../shared/service/auth.service";
import {OrderService} from "../../shared/service/order.service";
import { Zone } from 'src/app/shared/model/zone';

@Component({
  selector: 'app-order',
  template: `
    <div class="container mt-4" *ngIf="placeId$ | async as placeId">
      
      <div *ngIf="zones$ | async as zones" class="card-deck">
        <div class="card" *ngFor="let zone of zones;  index as iZone">

          <div class="d-flex card-header align-items-center">
            <span class="flex-grow-1">{{zone.name}}</span><span
              class="badge badge-primary badge-pill ">{{zone.counter}}</span>
          </div>
          <div class="card-body border">
            <ul *ngIf="zone.orders as orders" class="list-group">

              <li class="list-group-item d-flex align-items-center"
                  *ngFor="let order of orders | keyvalue;  index as iOrder;">
                <div class="flex-grow-1">
                  <span>{{order.value.data.name | titlecase}}</span>
                  <span *ngIf="!isEmpty(order.value.data.questions)"
                        class="ml-1">(</span>
                  <span *ngFor="let data of order.value.data.questions | keyvalue">                                     
                                        <small *ngFor="let reponse of data.value.reponses"><i>{{reponse}},</i></small>
                                    </span>
                  <ng-container *ngIf="!isEmpty( order.value.data.questions)">)
                  </ng-container>
                  <br>
                  <small class="text-primary">Commande prise
                    à {{formatDate(order.value.ordered)}}</small>
                  <small class="text-warning ml-1">{{getStatus(order.value.status)}}</small>
                </div>
                <div class="position-relative">
                  <a routerLink="./" [queryParams]="{ 'popover-id': 'popover_'+iZone+iOrder}"
                     queryParamsHandling="merge" title="close" role="button"><i
                      class="far fa-ellipsis-v"></i></a>

                  <ul *ngIf="(popoverId$ | async) === ('popover_'+iZone+iOrder)"
                      id="popover_{{iZone}}{{iOrder}}" class="list-group shadow-lg position-absolute"
                      style="z-index: 9999; right: -10px; top:20px">
                    <a  *ngFor="let status of typeStatus | keyvalue" (click)="onChangeStatus(placeId,zone.id,order.key,status.key)"
                        role="button"
                        class="list-group-item list-group-item-action py-1 pl-1">{{status.value}}</a>
                  </ul>
                </div>


              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <ng-container *ngIf="this.popoverId$ | async">
      <a routerLink="./" [queryParams]="{'popover-id' : null}" queryParamsHandling="merge"
         style="background: rgba(0,0,0,.1);height: 100vh;width :100vw; position: fixed;top: 0"></a>
    </ng-container>
  `,
  styles: [
  ]
})
export class OrderComponent implements OnInit {
  typeStatus = {
    0: 'Non Lu',
    1: 'Lu',
    2: 'Archivé'
  }
   isEmpty = function(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop))
        return false;
    }
    return true;
  }
  user$: Observable<any>;
  placeId$: Observable<string>;
  zones$: Observable<Zone[]>;
  popoverId$: Observable<any>;
  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private authService: AuthService,
      private orderService: OrderService,
     ) {
    this.user$ = this.authService.user;
    this.placeId$ = this.activatedRoute.queryParams.pipe(map(params => params['place-id']));
    this.zones$ = this.placeId$.pipe(mergeMap(placeId => this.orderService.getZones(placeId)));
    this.popoverId$ = this.activatedRoute.queryParams.pipe(map(params => params['popover-id']));
  }

  getStatus(key){
    return key ? this.typeStatus[key] : this.typeStatus[0];
  }

  ngOnInit(): void {
  }

  formatDate(date: any) {
    // todo voir comment faire une documentation technique
    moment.locale('fr');
    return moment(date.toDate()).fromNow();
  }

  onChangeStatus(placeId:string, zoneId:string,orderId: string, orderStatus:string) {
    this.orderService.updateOrder(placeId, zoneId,orderId, orderStatus).then(()=>{
      this.router.navigate(['/order'],   { queryParams: { 'popover-id' : null }, queryParamsHandling: "merge" });
    })
  }

}
