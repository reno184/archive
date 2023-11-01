import {Component, Input, OnInit} from '@angular/core';
import {LinkPage} from "../../../model/linkPage";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-md-menu',
  template: `
      <nav class="navbar navbar-expand-md navbar-light fixed-top  bg-light mb-3">
          <div class="container-fluid">
              <ul class="navbar-nav mr-auto">
                  <li class="nav-item" *ngFor="let link of links">
                      <a class="nav-link " routerLink="{{link.path}}" routerLinkActive="text-dark"
                         title="{{link.libelle}}">{{link.libelle}}</a>
                  </li>
              </ul>
              <ul class="navbar-nav">
                  <li class="nav-item"><a class="nav-link" (click)="onLogOff()" role="button"><i
                          class="far fa-lock-open"></i></a></li>
              </ul>
          </div>
      </nav>
      <div style="height: 40px"></div>
  `,
  styles: []
})
export class MdMenuComponent implements OnInit {
    @Input() links: LinkPage[];

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    onLogOff() {
        this.authService.logoff();
    }
}
