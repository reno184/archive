import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Toast} from "../shared/model/toast";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {environment} from '../../environments/environment';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
    selector: 'app-root',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <router-outlet></router-outlet>
        <small>{{version}}</small>
        <router-outlet name="modal"></router-outlet>
        <ng-container *ngIf="toasts$ | async as toasts">
            <ng-container *ngFor="let toast of toasts; index as i">
                {{toast}}
                <app-toast [toast]="toast" [index]="i"></app-toast>
            </ng-container>
        </ng-container>

        <ng-container *ngIf="errorSystem$ | async as errorSystem">
            <div style="height: 100vh; width: 100vw; background: rgba(210,7,7,.2);position: fixed;top:0"
                 class="d-flex align-items-center justify-content-center ">
                <div class="alert alert-light shadow border border-danger " role="alert"><strong
                        class="mr-1">Erreur:</strong>{{errorSystem}}<a href="/" class="ml-4"><i
                        class="far fa-times-circle text-danger"></i></a></div>
            </div>
        </ng-container>
        <ng-container *ngIf="blocker$ | async as blocker">
            <div *ngIf="blocker === true "
                 style="background: rgba(0,0,0,.1);height: 100vh;width :100vw; position: fixed;top: 0;z-index: 2"
                 class="d-flex justify-content-center align-items-center">
            </div>
        </ng-container>
        <ng-container *ngIf="params$ | async as params">
            <a *ngIf="!!params['menu']" [routerLink]="['/', {outlets: {modal: null}}]" queryParamsHandling="merge"
               [queryParams]="{ 'menu' : null}"
               style="background: rgba(0,0,0,.1);height: 100vh;width :100vw; position: fixed;top: 0;z-index: 2"
               class="d-flex justify-content-center align-items-center">
            </a>
        </ng-container>
    `,
    styles: []
})
export class AppComponent {

    toasts$: Observable<Toast[]>
    errorSystem$: Observable<string>
    blocker$: Observable<boolean>
    params$: Observable<Params>
    version: string;

    constructor(private store: Store<any>, private activatedRoute: ActivatedRoute) {
        this.toasts$ = this.store.pipe(select(state => state.root.toasts));
        this.errorSystem$ = this.store.pipe(select(state => state.root.message));
        this.blocker$ = this.store.pipe(select(state => state.root.blocker));
        this.version = environment.version
        this.params$ = this.activatedRoute.queryParams

    }

    onHide() {
        //  this.store.dispatch(toastAction.onHide())
    }
}
