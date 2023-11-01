import {Component} from '@angular/core'

@Component({
    selector: 'app-layout-layout',
    template: `
        <a [routerLink]="['/', {outlets: {modal: null}}]"
           style="position: fixed; background:rgb(255,239,213, .7); inset:0;"></a>
        <div class="card shadow border border-primary"
             style="position: fixed; left: 50%;min-width: 370px; transform: translateX(-50%); top: 150px">
            <router-outlet></router-outlet>
        </div>
    `,
    styles: [
    ]
})
export class ModalLayoutComponent {
    // todo when modal fix the background
}
