import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../shared/service/auth.service";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {filter, mergeMap} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Toast} from "../shared/model/toast";
import {addToast} from "../store/root.action";
import {RestoService} from "../shared/service/resto.service";
import {environment} from "../../environments/environment";


@Component({
    selector: 'app-sign-in',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <style>
            input[type="password"]:focus, input[type="email"]:focus {
                z-index: 1
            }
        </style>

        <div style="height: 100vh;width: 100vw;" class="d-flex align-items-center justify-content-center bg-light">
            <div class="card shadow-sm" style="width: 300px;margin-top: -200px">
                <ng-container *ngIf="userState$ | async as user; else notConnected">
                    <div class="card-body text-center">
                        <img src="../../assets/img/android-chrome-192x192.png" alt="logo" style="width:192px">
                        <hr>
                        <ng-container *ngIf="restoHTTP$ | async as resto">

                            <ng-container *ngIf="resto.pending; else noRestoPending">
                                <i class="far fa-spin fa-spinner"></i>
                            </ng-container>
                            <ng-template #noRestoPending>
                                <div  *ngIf="!!resto.data" style="display: flex;flex-direction: column" >
                                        <a *ngFor="let item of resto.data" [routerLink]="['../admin']" [queryParams]="{'place-id' : item.id}">Accès carte {{item.name}}</a>
                                        <a *ngFor="let item of resto.data" [routerLink]="['../order']" [queryParams]="{'place-id' : item.id}">Accès commande {{item.name}}</a>
                                </div>
                                <div *ngIf="resto.error">{{resto.error}}</div>
                            </ng-template>
                        </ng-container>

                    </div>
                </ng-container>

                <ng-template #notConnected>
                    <header class="  text-center  my-3">
                        <img src="../../assets/img/android-chrome-192x192.png" alt="logo" style="width:192px">
                    </header>
                    <form [formGroup]="form" (ngSubmit)="onSubmit()"
                          class="card-body d-flex flex-column align-items-center">

                        <label for="iEmail" style="margin-bottom: 0"></label>
                        <input id="iEmail"
                               formControlName="email"
                               class="form-control" placeholder="Votre email" type="email"
                               style="border-bottom-left-radius: 0;border-bottom-right-radius: 0;" required="required"
                        >

                        <label for="iPassword" style="margin-bottom: 0"></label>
                        <input id="iPassword"
                               class="form-control"
                               placeholder="Votre password"
                               type="password"
                               style="border-top: none; border-top-left-radius: 0;border-top-right-radius: 0;"
                               formControlName="password" required="required"
                        >
                        <button type="submit" [disabled]="form.invalid"
                                class="mt-3 btn btn-primary btn-sm btn-block">Valider
                        </button>
                        <div class="text-left text-danger"
                             *ngIf="form.get('email').invalid && form.get('email').touched">
                            <small *ngIf="form.get('email').errors.required">Email requis</small>
                            <small *ngIf="form.get('email').errors.email">Format email invalide</small>
                        </div>
                        <div class="text-left text-danger"
                             *ngIf="form.get('password').invalid && form.get('password').touched">
                            <small *ngIf="form.get('password').errors.required">Password requis</small>
                            <small *ngIf="form.get('password').errors.minlength">Password longueur de 6 minimun</small>
                        </div>

                    </form>
                </ng-template>
            </div>
        </div>
    `,
    styles: []
})
export class AuthComponent implements OnInit, OnDestroy {
    userState$: Observable<firebase.default.User | null>;
    restoHTTP$: Observable<any>;
    form: FormGroup;

    constructor(public authService: AuthService,private restoService : RestoService, private store: Store<any>, private formBuilder: FormBuilder) {
        this.userState$ = this.authService.user;
        this.restoHTTP$ = this.userState$.pipe(
            filter(user => !!user),
            mergeMap((user) => {
                return this.restoService.getItems(user)
            })
        );
    }

    ngOnInit(): void {

        this.form = this.formBuilder.group({
            'email': this.formBuilder.control(environment.email, Validators.compose(
                [Validators.required, Validators.email],
                )
            ),
            'password': this.formBuilder.control(environment.password, Validators.compose(
                [Validators.required, Validators.minLength(6)],
            ))
            ,
        });

    }

    ngOnDestroy() {
    }

    onSubmit() {
        this.authService.loginEmailPassword(this.form.get('email').value, this.form.get('password').value).then(() => {
            this.store.dispatch(addToast({
                toaster: {
                    id: 'toast' + Date.now(),
                    message: 'Bien connecté',
                    title: 'Message',
                    autoclose: true,
                    color : 'bg-success',
                    delay : 2000
                } as Toast
            }))
        }).catch(err => {
            this.store.dispatch(addToast({
                toaster: {
                    id: 'toast' + Date.now(),
                    message: err.message,
                    title: 'Erreur',
                    autoclose: true,
                    color : 'bg-danger',
                    delay : 4000
                } as Toast
            }))
        });
    }
}
