import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'page-layout',
  template: `
      <div class="container">
          <nav class="navbar navbar-expand navbar-light bg-light shadow rounded mt-2">
              <ul class="navbar-nav mr-auto align-items-center">
                  <img src="../../../assets/img/favicon-32x32.png" alt="logo">
                  <ng-container *ngIf="$meta | async as meta">
                      <div class="text-capitalize ml-3">{{meta.title}}</div>
                  </ng-container>
              </ul>
              <div class="badge badge-primary p-2 badge-pill mr-1">
                  <a routerLink="/page/setting" class="text-white" title="setting">
                      <i class="far fa-cog"></i>
                  </a>
              </div>
              <div class="badge badge-primary p-2 badge-pill mr-1">
                  <a routerLink="/" class="text-white" title="Menu">
                      <i class="far fa-home"></i>
                  </a>
              </div>
              <div class="badge badge-primary p-2 badge-pill">
                  <a (click)="onSignOut()" role="button" class="text-white" title="Logout">
                      <i class="far fa-lock-open"></i>
                  </a>
              </div>
          </nav>
          <router-outlet></router-outlet>
      </div>
  `,
  styles: [
  ]
})
export class PageLayout implements OnInit {
    $meta: Observable<Params>;

    constructor(private router: Router, private  activatedRoute : ActivatedRoute, private auth: AngularFireAuth,) {
        this.$meta = this.activatedRoute.firstChild.data
    }

    ngOnInit(): void {
    }

    async onSignOut() {
        await this.auth.signOut();
        await this.router.navigateByUrl('/')
    }
}
