import {Component, Input, OnInit} from '@angular/core';
import {LinkPage} from "../../../model/linkPage";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-xs-menu',
  template: `

      <nav class="nav fixed-top">
          <div class="container-fluid text-right">
              <ul class="navbar-nav">
                  <li class="nav-item">
                      <a class="nav-link text-warning" (click)="open=true">Open x</a>
              </ul>
          </div>
      </nav>

      <ng-container *ngIf="open">
          <a (click)="open = false" role="button" class="menu-left-drawer">
          </a>
          <div class="menu-left-content">
              <ul class="list-unstyled">
                  <li class="my-2">Menu</li>
                  <ul class="list-unstyled ml-2">
                      <li *ngFor="let link of links"><a (click)="menu(link.path)" routerLinkActive="text-dark"
                                                        title="{{link.libelle}}">{{link.libelle}}</a></li>
                      <li><a (click)="onLogOff()" role="button">Déconnexion</a></li>
                  </ul>
              </ul>
          </div>
      </ng-container>


  `,
    styles: [`
        .menu-left-drawer {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(53, 53, 0, .3);
        }

        .menu-left-content {
            position: absolute;
            height: 100vh;
            background: white;
            width: 200px;
            top: 0;
            left: 0;
            transform: translateX(-50px);
        }

    `]
})
export class XsMenuComponent implements OnInit {
    open = false;
    @Input() links: LinkPage[];

    constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
    }

    onLogOff() {
        this.authService.logoff();
    }

    menu(path) {
        this.open = false;
        this.router.navigate([path], {relativeTo: this.activatedRoute, queryParamsHandling: 'preserve'})
    }
}
