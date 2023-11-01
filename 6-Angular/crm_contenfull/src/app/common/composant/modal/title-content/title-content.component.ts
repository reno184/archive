import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {combineLatest, Observable, Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {QuiterieService} from "../../../service/quiterie.service";
import {filter, map, mergeMap, shareReplay} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {add_request, update_request} from "../../../service/title-content.action";
import {listById, selectLoading} from "../../../service/title-content.reducer";
import {TitleContent} from "../../../model/tile-content";

@Component({
    selector: 'app-title-content',
    template: `
        <ng-container *ngIf="params$ | async as params">
            <form [formGroup]="formGroup" (submit)="onSave(params)" class="m-3">
                <div class="form-group">
                    <input type="text" class="form-control" formControlName="title">
                </div>
                <div class="form-group">
                   <!-- <quill-editor [modules]="editorConfig" formControlName="content"></quill-editor>-->
                </div>
                <footer class="d-flex justify-content-around">
                    <a [routerLink]="['/', {outlets: {modal: null}}]" queryParamsHandling="merge"
                       [queryParams]="{ 'item-id' : null}" class="btn btn-secondary">Retour</a>
                    <button class="btn btn-primary" type="submit" [disabled]="formGroup.invalid">
                                  <ng-container *ngIf="!!params['item-id']; else create">Modifier</ng-container>
                        <ng-template #create>Nouveau</ng-template>
                    </button>
                </footer>
            </form>
        </ng-container>
    `,
    styles: []
})
export class TitleContentComponent implements OnInit, OnDestroy {
    formGroup: FormGroup;
   // loading$: Observable<boolean>
    params$: Observable<Params>;
    sub: Subscription;
    editorConfig = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            ['blockquote'],
            [{'header': 1}, {'header': 2}],
            ['link'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
        ]
    };

    constructor(private formBuilder: FormBuilder, public store: Store<any>, private activatedRoute: ActivatedRoute, private tileContentService: QuiterieService, private router: Router) {

        this.formGroup = this.formBuilder.group({
            title: ['', Validators.required],
            content: ['', Validators.required],
        })

        this.params$ = this.activatedRoute.queryParams.pipe(shareReplay(1));

        const paramId$ = this.params$.pipe(filter(params => !!params['item-id']), map(params => params['item-id']));
        const listLoaded$ = this.store.select(selectLoading).pipe(filter(loading => loading === false));

        this.sub = combineLatest([listLoaded$, paramId$]).pipe(mergeMap(([loaded, id]) => {
            return this.store.select(listById, {id})
        })).subscribe(item => {
            this.formGroup.patchValue({
                title: item.title,
                content: item.content
            });
        });
    }

    ngOnInit(): void {

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSave(params) {
        const obj: TitleContent = {
            title: this.formGroup.get('title').value,
            content: this.formGroup.get('content').value
        }

        if (!!params['item-id']) {
            this.store.dispatch(update_request({id: params['item-id'], obj}))
        } else {
            this.store.dispatch(add_request({obj: {...obj, ...{feature: params['feature']}}}))
        }
        this.formGroup.patchValue({
            title: '',
            content: ''
        });
        this.router.navigate(['/', {outlets: {modal: null}}], {
            queryParamsHandling: 'merge',
            queryParams: {'item-id': null}
        });
    }

}
