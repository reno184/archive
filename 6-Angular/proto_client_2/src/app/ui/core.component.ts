import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {filter, map, mergeMap, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../shared/app.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Rep} from "../shared/model/rep";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-full-carte',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `

        <ng-container *ngIf="userState$ | async as state">
            <div *ngIf="state.pending" style="height: 80vh;display: flex; justify-content: center; align-items: center">
                <i class="far fa-spin fa-spinner"></i>
            </div>
            <ng-container *ngIf="!state.pending">
                <div *ngIf="!state.user"
                     style="height: 30vh;display: flex; justify-content: center; align-items: center; flex-direction: column">
                    <h3>Connexion</h3>
                    <button (click)="onSignIn()">Sign in</button>
                </div>
                <ng-container *ngIf="!!state.user">
                    <ng-container *ngIf="userDbState$ | async as userDbState">
                        <div *ngIf="userDbState.pending"
                             style="height: 80vh;display: flex; justify-content: center; align-items: center">
                            <i class="far fa-spin fa-spinner"></i>
                        </div>
                        <ng-container *ngIf="!userDbState.pending">
                            <ng-container
                                    *ngIf="!!userDbState.data  && userDbState.data.placeId; else noUserDbAuthenticated">
                                <div style="text-align: right">
                                    <a [routerLink]="['/', { outlets: { modal: 'modal/basket'}}]" title="panier"
                                       queryParamsHandling="preserve"
                                       style="display: inline-block;cursor: pointer; padding: 10px; border-radius: 50%;background:   white;margin:0 20px; box-shadow: 1px 1px 1px rgba(0,0,0,.5)">
                                        <i class="far fa-shopping-basket"></i></a>
                                </div>

                                <div style="margin: 0 30px">
                                    <ng-container *ngIf="placeNameGET$| async as placeNameGET">
                                        <ng-container *ngIf="placeNameGET.pending; else noplaceNameGETpending">
                                            <i class="far fa-spin fa-spinner"></i>
                                        </ng-container>
                                        <ng-template #noplaceNameGETpending>
                                            <h3 *ngIf="placeNameGET.data">{{placeNameGET.data.name}}</h3>
                                            <small *ngIf="placeNameGET.error"
                                                   style="color: red"><i>{{placeNameGET.error}}</i></small>
                                        </ng-template>
                                    </ng-container>

                                    <ng-container *ngIf="carteRep$ | async as carteRep">
                                        <ng-container *ngIf="carteRep.pending">
                                            <i class="far fa-spin fa-spinner"></i>
                                        </ng-container>
                                        <ng-container *ngIf="!carteRep.pending">
                                            <ng-container *ngIf="carteRep.data as groupes; else carteError">

                                                <ul *ngFor="let group of groupes | keyvalue ">
                                                    <h3>
                                                        {{group.value.name}}
                                                    </h3>

                                                    <ng-container *ngIf="group.value.articles;else noItem">
                                                        <li *ngFor="let article of group.value.articles | keyvalue ">
                                                            <a [routerLink]="['/', { outlets: { modal: 'modal/order'}}]"
                                                               [queryParams]="{'group-id': group.key, 'article-id': article.key}"
                                                               queryParamsHandling="merge"
                                                               style="display: flex;margin-bottom: 10px;"
                                                               title="Voir détail">


                                                                <div>{{article.value.name}}</div>
                                                                <!-- <ng-container
                                                                         *ngFor="let question of article.value.questions | keyvalue; let l = count">
                                                                     <small *ngFor="let reponse of question.value.reponses | keyvalue ">
                                                                         <i>
                                                                             {{reponse.value.name}}
                                                                             &lt;!&ndash; <ng-container
                                                                                      *ngIf="reponse.value.price > 0">
                                                                                  <small>({{reponse.value.price  | number:'1.2-2'}}
                                                                                      €)</small>
                                                                              </ng-container>&ndash;&gt;
                                                                         </i>
                                                                     </small>
                                                                 </ng-container>-->


                                                                <div style="flex: 1; padding: 0 20px">
                                                                    <hr style="border-top: dotted 1px #aaa">
                                                                </div>
                                                                <div>{{article.value.price  | number:'1.2-2' }} €</div>


                                                            </a>
                                                        </li>
                                                    </ng-container>
                                                    <ng-template #noItem>
                                                        <div>
                                                            <i class="far fa-box-open fa-2x"></i>
                                                        </div>
                                                    </ng-template>
                                                </ul>
                                            </ng-container>
                                        </ng-container>
                                        <ng-template #carteError>
                                            <div style="display: flex; align-items: center;justify-content: center; height: 100vh; flex-direction: column">
                                                <h4 style="margin-bottom: 0">Error:{{carteRep.error}}</h4>
                                                <a routerLink="../" title="retour">Retour</a>
                                            </div>
                                        </ng-template>
                                    </ng-container>

                                </div>
                            </ng-container>
                            <ng-template #noUserDbAuthenticated>
                                <div style="height: 30vh;display: flex; justify-content: center; align-items: center">
                                    <form [formGroup]="formGroup" (ngSubmit)="onSubmit()"
                                          style="display: flex;flex-direction: column; align-items: center;">
                                        <h3 style="margin-top: 10px">Authentification</h3>
                                        <label for="dd" style="margin-bottom: 10px">Code 4 chiffres</label>
                                        <input type="text" id="dd" style="margin-bottom: 10px"
                                               formControlName="placeToken" required>
                                        <ng-container *ngIf="repUserAuth$ | async as repUserAuth">
                                            <ng-container *ngIf="repUserAuth.pending;">
                                                <i class="far fa-spin fa-spinner" style="margin-top: 10px"></i>
                                            </ng-container>

                                            <small *ngIf="!repUserAuth.pending && repUserAuth.error"
                                                   style="color :#dc1212; display: inline-block; ">{{repUserAuth.error}}</small>
                                            <button type="submit" style="margin-top: 10px"
                                                    [disabled]="formGroup.invalid">Valider
                                            </button>
                                        </ng-container>
                                    </form>
                                </div>
                            </ng-template>
                        </ng-container>

                    </ng-container>

                </ng-container>
            </ng-container>
        </ng-container>
    `,
    styles: []
})
export class CoreComponent implements OnInit {
    placeNameGET$: Observable<any>;
    user: any;
    formGroup: FormGroup
    userDbState$: Observable<any>;
    repUserAuth$ = new BehaviorSubject<Rep>({pending: false});
    userState$: Observable<any>;
    carteRep$: Observable<Rep>;

    get placeTOKEN() {
        return this.formGroup.get('placeToken');
    }

    constructor(
        private activatedRoute: ActivatedRoute,
        private appService: AppService,
        private formBuilder: FormBuilder
    ) {


        this.formGroup = this.formBuilder.group({
            userUid: '',
            placeToken: ['', Validators.required]
        })

        this.userState$ = this.appService.userState.pipe(tap(state => {
            if (!!state && state.user) {
                this.user = state.user;
            }
        }))


        this.userDbState$ = this.userState$.pipe(
            filter(state => !!state && !!state.user),
            mergeMap((state) => this.appService.watchUserDB(state.user.uid))
        );

        this.activatedRoute.queryParams.pipe(
            map(params => params['place-token']))
            .subscribe(placeToken => this.formGroup.get('placeToken').patchValue(placeToken))

        this.carteRep$ = this.userState$.pipe(
            filter(state => !!state && !!state.user),
            mergeMap(state => this.appService.getCarte(state.user)));

        // todo travailler sur le cache avec ou sans user
        this.placeNameGET$ = this.userDbState$.pipe(filter(userDBGET => !userDBGET.pending && userDBGET.data), mergeMap(userDBGET => this.appService.getPlaceName(userDBGET.data.placeId)))
    }

    ngOnInit(): void {
    }

    onSignIn() {
        this.appService.loaderSubject.next(true)
        this.appService.signAnonymous().then(() => this.appService.loaderSubject.next(false))
    }

    onSubmit() {

        this.appService.userPlaceToken(this.placeTOKEN.value, this.user).subscribe(rep => {
            this.repUserAuth$.next(rep)
            this.placeTOKEN.patchValue('')
        });
    }
}
