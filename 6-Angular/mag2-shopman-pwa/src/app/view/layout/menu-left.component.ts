import {Component} from '@angular/core'

@Component({
    selector: 'app-menu-left',
    template: `
        <a [routerLink]="['/', {outlets: {menu: null}}]"
           style="position: fixed; background:rgb(0,0,0, .4); inset:0;"></a>
        <div class="menu-left">
            <ul class="list-unstyled">
                <li>
                    Search
                    <ul>
                        <li><a [routerLink]="['/']">My search</a></li>
                        <li><a [routerLink]="['/']">My favorites products</a></li>
                    </ul>
                </li>
                <li>
                    Search
                    <ul>
                        <li><a [routerLink]="['/']">Rechercher</a></li>
                        <li><a [routerLink]="['/']">Mes recherches</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    `,
    styles: []
})
export class MenuLeftComponent {

}
