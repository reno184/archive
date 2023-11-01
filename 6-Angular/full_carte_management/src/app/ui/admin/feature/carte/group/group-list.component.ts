import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../../../../shared/service/auth.service";
import {Group} from "../../../../../shared/model/group";
import {GroupService} from "../../../../../shared/service/group.service";
import {map, mergeMap} from "rxjs/operators";
import {FormBuilder} from "@angular/forms";
import {Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-group',
    template: `
        <p class="alert alert-primary my-3 border-dark">
            <small>
                <i class="far fa-question-circle mr-1"></i>
                Gestion des group
            </small>
        </p>
        <ng-container *ngIf="items$| async as groupes;">
            <div *ngFor="let group of groupes">
                <h3>{{group.name}}</h3>
                <div *ngFor="let block of group.blocks  | orderBy : 'rank': false " class="ml-2">
                    <div class="d-flex">
                        <div>{{block.name}}</div>
                        <span class="flex-grow-1 px-2">
    <hr style="border-top: dotted 1px #aaa" class="mb-0">
    </span>
                        <span>
    <span class="mr-1">{{block.counter > 0 ? block.counter : 'Aucun'}}</span>
    <some-element [ngPlural]="block.counter">
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
                           [queryParams]="{ 'group-id' : group.id,
                                    'block-id' : block.id
                                    }" queryParamsHandling="merge"
                           title="Attacher"
                           class="text-dark"><small>Ajouter</small></a>
                        <a [routerLink]="['/', { outlets: { modal: 'modal/modal-sort' }}]"
                           [queryParams]="{ 'group-id' : group.id,
                                    'block-id' : block.id
                                    }" queryParamsHandling="merge" class="ml-1 text-dark"
                           title="trier"><small>Trier</small></a>
                    </div>
                </div>
            </div>

        </ng-container>
    `,
    styles: []
})
export class GroupListComponent implements OnInit {

    user$: Observable<any>
    items$: Observable<Group[]>
    placeId$: Observable<string>

    constructor(private groupService: GroupService,
                private store: Store<any>,
                public authService: AuthService,
                private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute) {


        this.user$ = this.authService.user;
        this.placeId$ = this.activatedRoute.queryParams.pipe(map(params => params['place-id']));
        this.items$ = this.placeId$.pipe(mergeMap(placeId => this.groupService.getItems(placeId)));

    }

    ngOnInit(): void {
    }


}


