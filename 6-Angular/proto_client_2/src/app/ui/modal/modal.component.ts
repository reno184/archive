import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-modal',
    template: `

        <div style="position: fixed;top:0;z-index: 2;  height: 100vh;  width: 100vw;  background: rgba(53, 53, 0, .3);  display: flex;  align-items: center;  justify-content: center"
        >
            <div class="box_shadow"
                 style="
                 border-radius: 5px;
                 min-width:200px;
                 max-width: 400px;
                 margin:-20vh 20px 0 20px;
                 max-height: 60vh;
                 min-height: 120px;
                  overflow-x: hidden;overflow-y:auto;background: white;text-align: center;
                  padding: 20px 10px;display: flex;flex-direction: column">
                <div style="flex: 1">
                    <router-outlet></router-outlet>
                </div>
                <div style="marging:10px 0">
                    <a [routerLink]="['/', { outlets: { modal: null}}]" title="annuler"><small>Annuler</small></a>
                </div>
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
