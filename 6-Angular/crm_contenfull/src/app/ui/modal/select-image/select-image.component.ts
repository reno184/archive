import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {selectList} from "../../../store/carousel.reducer";
import {Router} from "@angular/router";

@Component({
    selector: 'app-select-image',
    template: `
        <ng-container *ngIf="images$ | async as images">
            <div class="row row-cols-1 row-cols-md-6 g-4" >
                <ng-container  *ngFor="let image of images">
                    <div class="col" *ngIf="image.path.indexOf('thumb_') === -1 ">
                        <div class="card">
                            <img [src]="image.url" class="card-img-top" alt="image">
                            <div class="card-body">Card title
                                <a (click)="onSelect(image.path)">Selectionner</a>
                            </div>
                        </div>
                    </div>
                </ng-container>
            </div>
        </ng-container>
    `,
    styles: []
})
export class SelectImageComponent implements OnInit {
    images$: Observable<any[]>;

    constructor(private store: Store<any>, private router : Router) {
        this.images$ = this.store.pipe(select(selectList));
    }

    ngOnInit(): void {

    }

    onSelect(path: string) {
        this.router.navigate(['/', {outlets: {modal: null}}], {
            queryParamsHandling: 'merge',
            queryParams: {'image-path-id': path.split('_')[1]}
        })
    }
}

