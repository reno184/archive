import {Component, Input, OnInit} from '@angular/core';
import {LinkPage} from "../../../model/linkPage";
import {AuthService} from "../../../service/auth.service";

@Component({
    selector: 'app-lg-menu',
    template: `
        <ul class="list-unstyled">
            <li class="my-2">Menu</li>
            <ul class="list-unstyled ml-2">
                <li *ngFor="let link of links">
                    <a routerLink="{{link.path}}" routerLinkActive="text-dark"
                       title="{{link.libelle}}">{{link.libelle}}</a></li>
                <li>
                    <hr>
                </li>
                <li><a (click)="onLogOff()" role="button">Déconnexion</a></li>
            </ul>
        </ul>
    `,
    styles: []
})
export class LgMenuComponent implements OnInit {
    @Input() links: LinkPage[];

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    onLogOff() {
        this.authService.logoff();
    }

}
