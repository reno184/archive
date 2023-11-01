import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/service/auth.service";
import {Observable} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Stat} from "../../shared/model/stat";
import {StatService} from "../../shared/service/stat.service";
import {mergeMap, tap} from "rxjs/operators";

@Component ({
	selector: 'app-admin-page',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
      <nav class="navbar navbar-light bg-white navbar-expand shadow-sm">
          <ng-container *ngIf="params$ | async as params">
              <div class="navbar-brand">
                  <img src="../../../assets/img/favicon-32x32.png" alt="logo" width="32">
              </div>
              <ul class="navbar-nav mr-auto ">

                  <ng-container *ngIf="stat$ | async as stats">

                      <li class="nav-item dropdown d-block d-lg-none">
                          <a class="nav-link dropdown-toggle" [routerLink]="['/', {outlets: {modal: null}}]"
                             queryParamsHandling="merge" [queryParams]="{ menu : 'open'}" id="menuTopBtn"
                             role="button" data-toggle="dropdown" aria-haspopup="true">
                              Menu
                          </a>
                          <div class="dropdown-menu" [ngClass]="{ 'show' : !!params['menu']}" id="menuTop"
                               aria-labelledby="menuTop">

                              <a class="nav-link" routerLinkActive="text-primary" routerLink="visu"
                                 queryParamsHandling="merge" [queryParams]="{ 'menu' : null}">Carte complète
                              </a>

                              <ng-container *ngFor="let stat of stats">
                                  <a *ngIf="stat.counter >0" class="nav-link" [queryParams]="{ 'menu' : null}"
                                     routerLinkActive="text-primary" routerLink="{{stat.url}}"
                                     queryParamsHandling="merge">{{stat.name| titlecase}}
                                      <span class="badge badge-primary text-white">{{stat.counter}}</span>
                                  </a>
                              </ng-container>
                          </div>
                      </li>
                      <li class="nav-item  d-none d-lg-block">
                          <a class="nav-link" routerLinkActive="text-primary" routerLink="visu"
                             queryParamsHandling="preserve">Carte complète
                          </a>
                      </li>
                      <li class="nav-item d-none d-lg-block" *ngFor="let stat of stats">
                          <a class="nav-link" routerLinkActive="text-primary"
                             routerLink="{{stat.url}}"
                             queryParamsHandling="preserve">{{stat.name| titlecase}}
                              <span class="badge badge-primary text-white">{{stat.counter}}</span>
                          </a>
                      </li>
                  </ng-container>
              </ul>
              <div *ngIf="user$ | async as user">
                  <div class="badge badge-primary text-white p-2 mr-2 badge-pill shadow-sm">
                      <a routerLink="/" role="button" title="Accueil" class="text-white">
                          <i class="far fa-home"></i>
                      </a>
                  </div>
                  <div class="badge badge-danger text-white p-2 mr-2 badge-pill shadow-sm">
                      <a (click)="onUpdateCounter(user,params)" role="button" role="button" title="rafraichir" class="text-white">
                          <ng-container>

                          </ng-container>
                          <ng-template>

                          </ng-template>
                          <i class="far fa-cog"></i>
													<span *ngIf="$pendingRefresh | async as refresh">
													{{refresh}}
													</span>
                      </a>
                  </div>
                  <div class="badge badge-primary text-white p-2 badge-pill shadow-sm">
                      <a (click)="onSignOut()" role="button" title="Déconnexion" class="text-white">
                          <i class="far fa-lock-open"></i>
                      </a>
                  </div>
              </div>
          </ng-container>
      </nav>
      <div class="container">
          <router-outlet></router-outlet>
      </div>
	`,
	styles: []
})
export class AdminComponent implements OnInit {

	user$: Observable<any>;
	stat$: Observable<Stat[]>;
	params$: Observable<Params>;
	$pendingRefresh: Observable<boolean>

	constructor (private statService: StatService,
							 private authService: AuthService,
							 private activatedRoute: ActivatedRoute,
							 private router: Router) {

		this.user$ = this.authService.user;

		this.params$ = this.activatedRoute.queryParams
		this.stat$ = this.params$.pipe (mergeMap (params => this.statService.getStat (params['place-id'])));
	}

	ngOnInit (): void {
	}

	onSignOut () {
		this.authService.logoff ();
		this.router.navigateByUrl ('/')
	}

	onUpdateCounter (user, params) {
		this.$pendingRefresh = this.statService.refresh(user, params['place-id']);
	}


}
