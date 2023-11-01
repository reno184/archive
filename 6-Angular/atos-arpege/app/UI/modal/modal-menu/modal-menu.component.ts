import { Component, OnInit } from '@angular/core';
import labelData from './data.label.json';
import staticData from './data.static.json';
import { LabelModalMenu } from './label.data.interface';
import { StaticModalMenu } from './data.static.interface';
import { AppInitService } from '../../../app.init.service';

@Component({
  selector: 'app-menu',
  templateUrl: './modal-menu.component.html'
})
export class ModalMenuComponent implements OnInit {
  labelModalMenu: LabelModalMenu = labelData;
  staticModalMenu: StaticModalMenu = staticData;

  constructor(public appInitService: AppInitService) {
  }

  get userRole(): string {
    return this.appInitService.confFromServer.USER_ROLE;
  }

  ngOnInit() {
  }

  isRole(roles: string[], userRole: string) {
    return roles.indexOf(userRole) > -1;
  }
}
