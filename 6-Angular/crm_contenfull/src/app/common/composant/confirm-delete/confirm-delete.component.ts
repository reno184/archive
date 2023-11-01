import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-confirm-delete',
    template: `
        <a *ngIf="!open" (click)="open = true" role="button" class="ml-2" title="delete">
            <i  class="far fa-trash"></i></a>
        <span *ngIf="open" class="ml-2">
        <a (click)="onDelete(id)" class="text-danger" title="delete" role="button">Oui</a>
        <a (click)="open = false" title="cancel" role="button">/Non</a>
    </span>
    `,
    styles: []
})
export class ConfirmDeleteComponent implements OnInit {
    open = false;
    @Input() id: string;
    @Output() clickedEvent = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }

    onDelete(id) {
        this.clickedEvent.emit(id);
    }
}
