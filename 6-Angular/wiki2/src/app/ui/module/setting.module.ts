import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingPage} from "../page/setting.page";
import {PanelTagPartial} from "../partial/panelTag.partial";
import {RouterModule} from "@angular/router";
@NgModule({
  declarations: [SettingPage,PanelTagPartial],
  imports: [
    CommonModule,
      RouterModule
  ]
})
export class SettingModule { }
