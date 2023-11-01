import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-modal',
    template: `
        <style>
            .rhe-modal {
                width: 400px;
            }

            @media (max-width: 575.98px) {
                .rhe-modal {
                    width: 300px;
                }
            }
        </style>
        <div class="modal" style="position: fixed;top:0;z-index: 2;  height: 100vh;  width: 100vw;  background: rgba(53, 53, 0, .3);  display: flex;  align-items: center;  justify-content: center"
        >
            <div class="bg-white pt-4 pb-2 shadow rhe-modal"
                 style="border-radius: 5px;position: relative;">
                <!-- <a [routerLink]="['/', { outlets: { modal: null }}]" queryParamsHandling="preserve"
                    style="position:absolute;top:3px;right:3px" title="close">
                     <i class="fas fa-times-circle text-dark" style="font-size:1.3rem"></i>
                 </a>-->
                <router-outlet></router-outlet>
            </div>
        </div>
    `,
    styles: []
})
export class ModalComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
