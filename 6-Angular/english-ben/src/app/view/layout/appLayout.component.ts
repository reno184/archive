import { Component } from '@angular/core';
import {AuthService} from "../../core/auth.service";
import {Router} from "@angular/router";
import {take} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
    selector: 'app-app-layout',
    template: `
        <div *ngIf="init">
            <nav style="margin: 10px">
                <a [routerLink]="['episode']" class="margin-right:10px" >episode</a> |
                <a [routerLink]="['vocabulary']" >vocabulary</a> |
                <a [routerLink]="['quiz']" >quiz</a>
                <button (click)="onLogout()">logOut</button>
            </nav>
            <router-outlet></router-outlet>    
        </div>
  `,
    styles: [
    ]
})
export class AppLayoutComponent {
    init = false
    constructor(private auth : AngularFireAuth, private authService : AuthService, private router : Router) {
        this.auth.authState.pipe(take(1)).subscribe(() =>{
            this.init = true
        } )
    }
    onLogout() {
        this.authService.logOut().then(async ()=>{
            await this.router.navigate(['/auth']);
        })
    }
}
