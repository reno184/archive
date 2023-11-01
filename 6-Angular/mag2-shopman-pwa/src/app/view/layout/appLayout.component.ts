import {Component} from '@angular/core'

import {ActivatedRoute} from '@angular/router'
import {AuthManager} from '../../core/manager/0-auth/auth.manager'

@Component({
    selector: 'app-app-layout',
    template: `
        <div *ngIf="init">
            <nav class=" navbar navbar-expand bg-white shadow-sm">
                <div class="container-fluid">
                    <ul class="navbar-nav  w-100">
                        <a class="navbar-brand d-none  d-sm-block" href="#">
                            <img src="../../../assets/icons/icon-72x72.png" alt="Bootstrap" style="width: 32px">
                        </a>
                        <a [routerLink]="['/', { outlets: { menu: 'menuLeft'}}]" [queryParams]="{ body : 'fix'}"
                           class="d-block  d-sm-none"><i class="far fa-bars"></i></a>
                        <li class="nav-item d-none  d-sm-block">
                            <a [routerLink]="['6-products']" routerLinkActive="text-dark" class="nav-link">Products</a>
                        </li>
                        <li class="nav-item d-none  d-sm-block">
                            <a [routerLink]="['todo']" routerLinkActive="text-dark" class="nav-link">Todos</a>
                        </li>
                        <li class="mx-auto"></li>
                        <li class="nav-item">
                            <a href="#" (click)="onLogout($event)"><i class="far fa-lock-alt"></i></a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="container-fluid">
                <router-outlet></router-outlet>
            </div>
        </div>
    `,
    styles: []
})
export class AppLayoutComponent {
    init = true

    constructor(private authService: AuthManager, private activatedRoute: ActivatedRoute) {

    }

    async onLogout(e: Event) {
        e.preventDefault()
        await this.authService.signOut()
    }
}
