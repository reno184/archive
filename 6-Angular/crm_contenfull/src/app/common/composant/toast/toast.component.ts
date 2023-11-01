import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {closeToast} from "../../../store/root.action";
import {tap} from "rxjs/operators";

@Component({
    selector: 'app-toast',
    template: `
        <div style="position: absolute;right: 10px;bottom:10px" *ngIf="toast$ | async as toast">
            <div class="toast show" role="alert">
                <div class="toast-header">
                    <div class="rounded mr-1" style="height: 10px; width: 10px;"
                         [ngStyle]="{'background-color': toast.color}"></div>
                    <strong class="mr-auto">Message</strong>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"
                            (click)="onClose()"><span aria-hidden="true">&times;</span></button>
                </div>
                <div class="toast-body">{{toast.message}}</div>
            </div>
        </div>

    `,
    styles: []
})
export class ToastComponent implements OnInit {
    toast$: Observable<any>

    constructor(private store: Store<any>) {
        this.toast$ = this.store.pipe(select(store => store.root.toast), tap(() => {
            setTimeout(() => this.store.dispatch(closeToast()), 2000);
        }))
    }

    ngOnInit(): void {
    }

    onClose() {
        this.store.dispatch(closeToast())
    }
}
