import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {map, mergeMap} from "rxjs/operators";
import {FormuleService} from "../../../../../shared/service/formule.service";
import {AuthService} from "../../../../../shared/service/auth.service";

@Component({
    selector: 'app-formule-list',
    template: `
        <ng-container *ngIf="user$ | async as user">

            <ng-container *ngIf="placeId$| async as placeId">

                <p class="alert alert-primary my-3 border-dark">
                    <small>
                        <i class="far fa-question-circle mr-1"></i>
                        Gestion des formules
                    </small>
                </p>


                <ng-container *ngIf="items$| async as formules;">
                    <div *ngFor="let formule of formules">
                        <h3>{{formule.name}}</h3>
                        <div *ngFor="let composition of formule.compositions | keyvalue" class="ml-2">
                            <h4>{{composition.value.name}}</h4>
                            <div *ngFor="let block of composition.value.blocks | keyvalue" class="ml-2 mb-2">
                                <div class="d-flex">
                                    <span>{{block.value.name}}</span>
                                    <span class="flex-grow-1 px-2">
                                      <hr style="border-top: dotted 1px #aaa" class="mb-0">
                                </span>
                                    <span><span class="mr-1">{{block.value.counter > 0 ? block.value.counter : 'Aucun'}}</span>
                                    <some-element [ngPlural]="block.value.counter">
                                                     <ng-template ngPluralCase="other">articles
                    </ng-template>
                    <ng-template ngPluralCase="=1">article 
                    </ng-template>
                                           <ng-template ngPluralCase="=0">article
                    </ng-template>
                                       
                                                    </some-element>
                                
                                </span>
                                </div>

                                <div>

                                    <a [routerLink]="['/', { outlets: { modal: 'modal/formule-stock' }}]"
                                       [queryParams]="{ 'formule-id' : formule.id,
                                   'composition-id' :  composition.key,
                                    'block-id' : block.key
                                    }" queryParamsHandling="merge"
                                       title="Attacher"
                                       class="text-dark"><small>Ajouter</small></a>
                                    <a [routerLink]="['/', { outlets: { modal: 'modal/modal-sort' }}]"
                                       [queryParams]="{ 'formule-id' : formule.id,
                                   'composition-id' :  composition.key,
                                    'block-id' : block.key
                                    }" queryParamsHandling="merge" class="ml-1 text-dark"
                                       title="trier"><small>Trier</small></a>
                                </div>

                            </div>
                        </div>
                    </div>
                </ng-container>
            </ng-container>
        </ng-container>
    `,
    styles: []
})
export class FormuleListComponent implements OnInit {

    user$: Observable<any>
    items$: Observable<any[]>
    placeId$: Observable<string>

    constructor(private formuleService: FormuleService,
                private store: Store<any>,
                public authService: AuthService,
                private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute) {


        this.user$ = this.authService.user;
        this.placeId$ = this.activatedRoute.queryParams.pipe(
            map(params => params['place-id']));


        this.items$ = this.placeId$.pipe(mergeMap(placeId => this.formuleService.getItems(placeId)));

    }

    ngOnInit(): void {
    }


}
