import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CarteService} from "../../../../../shared/service/carte.service";
import {AuthService} from "../../../../../shared/service/auth.service";
import {filter, mergeMap, tap} from 'rxjs/operators';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-visu',
    template: `
    <div class="card mt-4" *ngIf="groupesHTTP$ | async as groupesHTTP">
        <div class="card-body">
            <ng-container *ngIf="groupesHTTP.pending;else nogroupesHTTPpending">
                <div style="height: 200px;display: flex; align-items: center; justify-content: center">
                    <i class="far fa-spinner fa-spin fa-2x"></i>
                </div>
            </ng-container>
            <ng-template #nogroupesHTTPpending>
                <ng-container *ngIf="(groupesHTTP.data && !isEmpty(groupesHTTP.data));else noGroup">
                    <app-visu-folder-item [folders]="groupesHTTP.data.groupes"></app-visu-folder-item>
                    <app-visu-folder-item [folders]="groupesHTTP.data.formules"></app-visu-folder-item>
                </ng-container>
                <ng-template #noGroup>
                    <div class="text-center py-4">
                        <h4>Carte vide</h4>
                        <i class="far fa-box-open fa-3x"></i>
                    </div>
                </ng-template>
            </ng-template>
        </div>
    </div>
    `,
    styles: []
})
export class VisuComponent implements OnInit {
    isEmpty = function(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    }
    groupesHTTP$: Observable<any>

    constructor(private carteService: CarteService,
                private authService: AuthService, private activatedRoute: ActivatedRoute) {
        this.groupesHTTP$ = this.activatedRoute.queryParams.pipe(mergeMap(params => this.authService.user.pipe(
            filter(user => !!user),
            mergeMap(user => this.carteService.getCarte(user, params['place-id']))
            )));
    }

    ngOnInit(): void {
    }
}
