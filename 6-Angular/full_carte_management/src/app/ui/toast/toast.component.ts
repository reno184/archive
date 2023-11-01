import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Toast} from "../../shared/model/toast";
import {removeToast} from "../../store/root.action";

@Component({
    selector: 'app-toast',
    template: `
        <div style="position: absolute;right: 10px;" [style]="{ top : (index+1) * 40 + 'px'}">
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <div class="rounded mr-1 {{ toast.color}}"
                         style="height: 10px; width: 10px"></div>
                    <strong class="mr-auto">{{ toast.title}}</strong>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"
                            (click)="onClose(toast.id)">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="toast-body">
                    {{toast.message}}
                </div>
            </div>
        </div>

    `,
    styles: []
})
export class ToastComponent implements OnInit, OnDestroy {
    @Input() toast: Toast
    @Input() index: number

    constructor(private store: Store<any>) {
    }

    ngOnInit(): void {
        if (this.toast.autoclose) {
            setTimeout(() => this.store.dispatch(removeToast({id: this.toast.id})),this.toast.delay)
        }
    }

    ngOnDestroy() {
    }

    onClose(id) {
        this.store.dispatch(removeToast({id}))
    }

}
