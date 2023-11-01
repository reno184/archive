import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'modal-layout',
    template: `
        <a [routerLink]="['/', {outlets: {modal: null}}]" style="position: fixed; background:rgba(0,0,0,.1); inset:0;" ></a>
        <div class="card" style="position: absolute; left: 50%; transform: translateX(-50%); top: 150px" >
            <router-outlet></router-outlet>
        </div>
  `,
    styles: [
    ]
})
export class ModalLayout implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
