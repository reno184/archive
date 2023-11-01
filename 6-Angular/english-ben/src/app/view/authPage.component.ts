import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {User} from '@angular/fire/auth';
import {take} from "rxjs";
import {AuthService} from "../core/auth.service";

@Component({
    selector: 'app-auth',
    template: `
      <style>
          input[type="password"]:focus, input[type="email"]:focus {
              z-index: 1
          }
      </style>
      <div class="h-75 d-flex align-items-center justify-content-center">
          <i *ngIf="loading" class="far fa-spin fa-spinner fa-4x"></i>
          <div class="card shadow-sm" style="width: 300px;" *ngIf="!loading">
              <div class="card-body d-flex flex-column justify-content-center align-items-center" *ngIf="user">
                  <div class="mt-3 text-center">
                      <div style="margin: 10px auto; ">
                          <img [src]="user.photoURL" class="img-thumbnail" [alt]="user.displayName"
                               style="width: 70px;height: 70px"/>
                      </div>
                      <div class="text-primary">{{user.email}}</div>
                  </div>
                  <a [routerLink]="['../app/episode']" class="btn btn-primary btn-sm mt-3">Enter</a>
              </div>
              <div *ngIf="!user">
                  <header class="  text-center  my-3">
                  </header>
                  <button type="button" class="btn btn-primary btn-sm" (click)="onLogin()">
                      Login
                  </button>
              </div>
          </div>
      </div>
  `,
    styles: [
    ]
})
export class AuthPageComponent  {
    loading = false
    user: User;
    constructor(private auth : AngularFireAuth, private authService: AuthService) {
        this.loading = true
        this.auth.authState.pipe(take(1)).subscribe(user =>{
            this.user =user
            this.loading = false
        } )
    }
    async onLogin() {
        this.loading = true
        this.authService.login().then(user=>{
            this.user =user
            this.loading = false
        })
    }
}
