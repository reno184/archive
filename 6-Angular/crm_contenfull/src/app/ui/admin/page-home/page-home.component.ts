import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AuthService} from "../../../common/service/auth.service";

@Component({
    selector: 'app-home',
    template: `

        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light bg-white rounded mt-3 mb-5">
                <div class="container-fluid">
                    <span class="navbar-brand">Accueil</span>
                    <div class="nav-item">
                        <i>{{email}}</i>
                        <button class="btn btn-secondary btn-sm ms-2" (click)="onSignOut()">logout</button>
                    </div>
                </div>
            </nav>
            <div class="text-center">
                <a [routerLink]="['/', { outlets: { modal: 'modal/carousel'}}]" title="Stock images" class="btn btn-primary">Stock images</a>
            </div>
            <hr>
            <app-list-course></app-list-course>
            <app-list-lesson></app-list-lesson>
        </div>
    `,
    styles: []
})
export class PageHomeComponent implements OnInit {
    email: string;

    constructor(private angularFireAuth: AngularFireAuth, private authService: AuthService) {
        this.angularFireAuth.currentUser.then(currentUser => this.email = currentUser.email);
    }

    ngOnInit(): void {
    }

    onSignOut() {
        this.authService.logoff();
    }
}
