import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {take} from "rxjs/operators";
import firebase from "firebase";
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

@Component({
  selector: 'auth-page',
  template: `
      <style>
          input[type="password"]:focus, input[type="email"]:focus {
              z-index: 1
          }
      </style>
      <div style="height: 100vh" class="d-flex align-items-center justify-content-center bg-light">
          <i *ngIf="loading" class="far fa-spin fa-spinner fa-4x"></i>
          <div class="card shadow-sm" style="width: 300px;margin-top: -200px" *ngIf="!loading">
              <div class="card-body d-flex flex-column justify-content-center align-items-center" *ngIf="user">
                  <img src="../../../assets/img/android-chrome-192x192.png" alt="logo" style="width:122px">
                  <div class="mt-3 text-center">
                      <div style="margin: 10px auto; ">
                          <img [src]="user.photoURL" class="img-thumbnail" [alt]="user.displayName"
                               style="width: 70px;height: 70px"/>
                      </div>
                      <div class="text-primary">{{user.email}}</div>
                  </div>
                  <a [routerLink]="['../page/algolia']" class="btn btn-primary btn-sm mt-3">Mes wikis</a>
              </div>
              <div *ngIf="!user">
                  <header class="  text-center  my-3">
                      <img src="../../../assets/img/android-chrome-192x192.png" alt="logo" style="width:192px">
                  </header>
                  <button type="button" class="btn btn-primary btn-sm" (click)="onLogin()">
                      Valid
                  </button>
              </div>
          </div>
      </div>
  `,
  styles: [
  ]
})
export class AuthPage implements OnInit {
    loading = false
    user: firebase.User;
    constructor(private auth: AngularFireAuth) {

    }
    async ngOnInit(): Promise<void> {
        this.loading = true
        this.user =  await this.auth.authState.pipe(take(1)).toPromise()
        this.loading = false
    }
    async onLogin() {
        await this.auth.signInWithPopup(new GoogleAuthProvider())
        this.user =  await this.auth.authState.pipe(take(1)).toPromise()
    }
}
