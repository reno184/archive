import {Component} from '@angular/core';
import {AppService} from "./shared/app.service";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Component({
    selector: 'app-root',
    template: `
        <div *ngIf="userState$ | async as state" style="text-align: right">
            <i *ngIf="state.pending" class="far fa-spin fa-spinner" style="margin: 10px 20px"></i>
            <a *ngIf="!state.pending && !!state.user" (click)="onSignOut(state.user)" title="déconnexion"
               style="display: inline-block;cursor: pointer; padding: 10px; border-radius: 50%; background : white; margin:10px 20px; box-shadow: 1px 1px 1px rgba(0,0,0,.5)"><i
                    class="far fa-lock-open"></i></a>
        </div>

        <router-outlet></router-outlet>
        <small style="color:#aaa;margin-top: 50px">{{version}}</small>
        <router-outlet name="modal"></router-outlet>
        <router-outlet name="basket"></router-outlet>
        <ng-container *ngIf="this.authService.loaderSubject | async">
            <div style="position: fixed;top:0; height: 100vh;  width: 100vw;  background:  rgba(255, 255, 255, .5);  display: flex;  align-items: center;  justify-content: center">
                <div style="text-align: center">
                    <i class="far fa-spin fa-spinner fa-2x"></i>
                </div>

            </div>
        </ng-container>
        <ng-container *ngIf="this.authService.stopperSubject | async">
            <div style="position: fixed;top:0;  height: 100vh;  width: 100vw;  background: rgba(255, 255, 255, .3);  display: flex;  align-items: center;  justify-content: center">
            </div>
        </ng-container>
    `,
    styles: []
})
export class AppComponent {
    version: string;
    userState$: Observable<any>;
    userLoaderSubject$: Observable<boolean>;

    constructor(public authService: AppService) {
        this.userState$ = this.authService.userState
        this.version = environment.version
    }

    onSignOut(user) {
        this.authService.signOut(user.uid)
    }
}
