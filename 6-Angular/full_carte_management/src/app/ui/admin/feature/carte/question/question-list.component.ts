import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {AuthService} from "../../../../../shared/service/auth.service";
import {map, mergeMap, tap} from "rxjs/operators";
import {QuestionService} from "../../../../../shared/service/question.service";
import {Question} from "../../../../../shared/model/question";
import {Store} from "@ngrx/store";
import {toogleBlocker} from "../../../../../store/root.action";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-question-list',
    template: `
        <ng-container *ngIf="user$ | async as user">
            <ng-container *ngIf="placeId$| async as placeId">
                <p class="alert alert-primary my-3 border-dark">
                    <small>
                        <i class="far fa-question-circle mr-1"></i>
                        Liste des questions à rattacher à un ou des articles...
                    </small>
                </p>
                <form [formGroup]="formGroup" (submit)="onSave(placeId)">
                    <div class="input-group">
                        <input type="text" class="form-control" formControlName="name" placeholder="Libelle">
                        <div class="input-group-append">
                            <button class="btn btn-primary" type="submit" [disabled]="formGroup.invalid">Ajouter
                            </button>
                        </div>
                    </div>
                </form>
                <ng-container *ngIf="items$| async as items">


                    <ul class="list-group mt-3">
                        <ng-container *ngIf="items.length > 0; else noItem">
                            <li *ngFor="let item of items; index as i" class="list-group-item d-flex">
                                <div class="flex-grow-1">
                                    <div *ngIf="item.uiEditingRow === true">
                                        <input type="text" id="name_{{i}}" class="border border-dark"
                                               value="{{item.name}}"
                                        >
                                    </div>
                                    <div *ngIf="item.uiEditingRow === false">
                                        <span>{{item.name}}</span>
                                        <a [routerLink]="['/', { outlets: { modal: 'modal/answer-list' }}]"
                                           [queryParams]="{'question-id' : item.id}" queryParamsHandling="merge"
                                           class="text-dark">
                                            <br>
                                            <ng-container *ngIf="item.counter && item.counter > 0; else noAttach">
                                                <small style="text-decoration: underline">{{item.counter}}
                                                    <some-element [ngPlural]="item.counter">
                                                        <ng-template ngPluralCase="=1">reponse possible attachée
                                                        </ng-template>
                                                        <ng-template ngPluralCase="other">reponses possibles attachées
                                                        </ng-template>
                                                    </some-element>
                                                </small>

                                            </ng-container>
                                            <ng-template #noAttach>
                                                <small>Question incomplète...</small>
                                            </ng-template>
                                            <i class="far fa-plus-circle ml-1"></i>
                                        </a>
                                    </div>
                                </div>
                                <a (click)="onUpdate(item, i,placeId)" role="button" *ngIf="item.uiEditingRow === true"
                                   class="mr-1">
                                    <i class="far fa-check-circle text-dark"></i>
                                </a>
                                <a (click)="onToggleRow(item)" role="button"
                                   class="mr-1">
                                    <i *ngIf="item.uiEditingRow === false" class="far fa-edit text-dark"></i>
                                    <i *ngIf="item.uiEditingRow === true" class="far fa-times-circle text-dark"></i>
                                </a>
                                <a *ngIf="item.uiEditingRow === false"
                                   queryParamsHandling="merge"
                                   [queryParams]="{'question-id' : item.id}"
                                   [routerLink]="['/', { outlets: { modal: 'modal/question-confirm-delete' }}]"
                                   title="question confirm delete" role="button" class="ml-1 text-dark">
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
export class QuestionListComponent implements OnInit {

    formGroup: FormGroup;
    user$: Observable<any>
    items$: Observable<Question[]>
    placeId$: Observable<string>

    constructor(private questionService: QuestionService,
                private activatedRoute: ActivatedRoute,
                private store: Store<any>,
                private authService: AuthService,
                private formBuilder: FormBuilder) {


        this.user$ = this.authService.user;
        this.placeId$ = this.activatedRoute.queryParams.pipe(
            map(params => params['place-id']));

        this.formGroup = this.formBuilder.group({
            name: ['', Validators.required],
            extra: 0
        })
        this.items$ = this.activatedRoute.queryParams.pipe(mergeMap(params => this.questionService.getItems(params).pipe(
            tap(items => items.map(item => item.uiEditingRow = false)))));
    }

    ngOnInit(): void {
    }


    onSave(placeId: string) {
        this.store.dispatch(toogleBlocker({active: true}))
        this.questionService.addItem(this.formGroup.get('name').value, placeId).finally(() => this.store.dispatch(toogleBlocker({active: false})));
        this.formGroup.reset()
    }

    onToggleRow(item: Question) {
        item.uiEditingRow = !item.uiEditingRow;
    }

    onUpdate(item: Question, index, placeId: string) {
        this.store.dispatch(toogleBlocker({active: true}))
        const newName = (document.getElementById('name_' + index) as HTMLInputElement).value;
        this.onToggleRow(item);
        this.questionService.updateItemName(item.id, newName, placeId).finally(() => this.store.dispatch(toogleBlocker({active: false})));
    }

}
