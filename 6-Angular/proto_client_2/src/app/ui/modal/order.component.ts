import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {filter, map, mergeMap, shareReplay, tap} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../shared/app.service";

@Component({
    selector: 'app-modal-order',
    template: `
        <ng-container *ngIf="tokenByUrl$ | async; else noTokenUrl">
            <ng-container *ngIf="carteRep$ | async as carteRep">
                <ng-container *ngIf="carteRep.pending">
                    <div style="display: flex;align-items: center; justify-content: center;height: 100px;">
                        <i class="far fa-spinner fa-spin"></i>
                    </div>
                </ng-container>
                <ng-container *ngIf="!carteRep.pending">

                    <ng-container *ngIf="!!carteRep.data;else errorPnl">

                        <div *ngIf="carteRep.data as article ">
                            <h3 style="margin-top: 0">{{article.name}}</h3>
                            <div style="margin-bottom: 10px"
                                 *ngFor="let question of article.questions  | keyvalue; index as indexQuestion;">
                                {{question.value.name}}
                                <br>
                                <small style="margin-left: 5px"
                                       *ngFor="let reponse of question.value.reponses  | keyvalue; index as indexReponse;"
                                >
                                    <input id="a_{{reponse.value.id}}" type="checkbox"
                                           (change)="onChange(article.questions[question.value.id].reponses[reponse.value.id])"
                                           [checked]="reponse.value.uiSelectingRow">
                                    <label for="a_{{reponse.value.id}}"
                                           style="margin-left: 5px">{{reponse.value.name}}</label>

                                </small>
                            </div>
                            <small style="color:#dc1212" *ngIf="noCheck"><i>Merci de préciser votre choix</i></small>
                            <form [formGroup]="formGroup1" (ngSubmit)="onSubmit1()"
                                  style="display: flex;flex-direction: column;margin-top: 20px">
                                <label for="frm1OrderToken" style="margin-bottom: 10px"><strong>Code
                                    secret</strong></label>
                                <input type="text" id="frm1OrderToken" style="margin-bottom: 10px"
                                       formControlName="orderToken"/>

                                <button type="submit" style="margin-bottom: 10px"
                                        [disabled]="formGroup1.invalid || ( (orderPOST$| async) &&(orderPOST$| async).pending)">
                                    Valider
                                </button>
                                <ng-container *ngIf="orderPOST$ | async as orderPOST">
                                    <ng-container *ngIf="!orderPOST.pending">
                                        <div *ngIf="orderPOST.data">Commande transmise</div>
                                        <small style="color:#dc1212"
                                               *ngIf="orderPOST.error"><i>{{orderPOST.error | json}}</i></small>
                                    </ng-container>
                                </ng-container>
                            </form>

                        </div>
                    </ng-container>
                    <ng-template #errorPnl>
                        <div>{{carteRep.error}}</div>
                    </ng-template>
                </ng-container>
            </ng-container>
        </ng-container>
        <ng-template #noTokenUrl>
            <form [formGroup]="formGroup2" (ngSubmit)="onSubmit2()"
                  style="display: flex;flex-direction: column;justify-content: center">
                <label for="frm2OrderToken" style="margin-bottom: 10px"><strong>Code secret</strong><a href="#"
                                                                                                       title="info"
                                                                                                       style="margin-left: 5px"><small><i
                        class="far fa-info-circle"></i></small></a></label>
                <input type="text" id="frm2OrderToken" formControlName="orderToken" style="margin-bottom: 10px"/>
                <button type="submit" [disabled]="formGroup2.invalid" style="margin-bottom: 10px">Valider</button>
            </form>
        </ng-template>
    `,
    styles: []
})
export class OrderComponent implements OnInit {
    noCheck = false;
    article: any;
    user: any;
    formGroup1: FormGroup;
    formGroup2: FormGroup;
    userState$: Observable<any>;
    carteRep$: Observable<any>; // httpRequest getCarte
    tokenByUrl$: Observable<boolean>;
    orderPOST$: Observable<any>;

    constructor(private activatedroute: ActivatedRoute,
                private formBuilder: FormBuilder,
                private router: Router,
                private appService: AppService) {

        this.formGroup1 = this.formBuilder.group({
            orderToken: ['', Validators.required]
        })
        this.formGroup2 = this.formBuilder.group({
            orderToken: ['', Validators.required]
        })

        this.userState$ = this.appService.userState
        this.carteRep$ = this.userState$.pipe(
            filter(state => !!state && !!state.user),
            tap(state => this.user = state.user),
            mergeMap(state => this.appService.getCarte(state.user).pipe(mergeMap(rep => {

                if (!rep.pending && rep.data) {
                    return this.activatedroute.queryParams.pipe(mergeMap(params => {

                        const carte = rep.data;
                        const groupId = params['group-id'];
                        const articleId = params['article-id'];
                        const questions = carte[groupId].articles[articleId].questions
                        for (let questionKey in questions) {
                            for (let reponseKey in questions[questionKey].reponses) {
                                carte[groupId].articles[articleId].questions[questionKey].reponses[reponseKey].uiSelectingRow = false;
                            }
                        }
                        this.article = carte[groupId].articles[articleId]
                        return of({pending: false, data: this.article});
                    }))
                } else {
                    return of(rep);
                }
            })))
        );

        this.tokenByUrl$ = this.activatedroute.queryParams.pipe(
            map(params => params['order-token']),
            filter(orderToken => !!orderToken),
            tap(orderToken => this.orderTOKEN.patchValue(orderToken)));

    }

    get orderTOKEN() {
        return this.formGroup1.get('orderToken');
    }

    ngOnInit(): void {

    }

    onSubmit1() {
        const body = {name: this.article.name}

        for (let questionKey in this.article.questions) {
            if (body['questions'] === undefined) {
                body['questions'] = {}
            }
            const question = this.article['questions'][questionKey]
            body['questions'][questionKey] = {reponses: [], empty: true}
            for (let reponseKey in question.reponses) {
                const reponse = question.reponses[reponseKey]
                if (reponse.uiSelectingRow) {
                    delete body['questions'][questionKey].empty;
                    body['questions'][questionKey].reponses.push(reponse.name);
                }
            }
        }
        let pass = true;
        for (let questionKey in body['questions']) {
            if (body['questions'][questionKey].empty) {
                pass = false;
            }
        }
       if (pass) {
            this.noCheck = false;
            this.orderPOST$ = this.appService.postOrder({
                body,
                token: this.orderTOKEN.value
            }, this.user).pipe(shareReplay(1), tap((orderPOST => {
                if(!orderPOST.pending && orderPOST.data ){
                    this.router.navigate(['./', {outlets: {modal: null}}])
                }
            })))
        } else {
            this.noCheck = true;
        }
    }

    onSubmit2() {
        this.router.navigate(['./', {outlets: {modal: 'modal/order'}}], {
            queryParams: {'order-token': this.formGroup2.get('orderToken').value},
            queryParamsHandling: "merge"
        })
    }

    onChange(item: any) {
        item.uiSelectingRow = !item.uiSelectingRow
    }
}
