import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmenuNetworkComponent } from '../submenu/submenu-network/submenu-network.component';
import { SubmenuPlaystopComponent } from '../submenu/submenu-playstop/submenu-playstop.component';
import { SubmenuPayloadComponent } from '../submenu/submenu-payload/submenu-payload.component';
import { SubmenuMissionComponent } from '../submenu/submenu-mission/submenu-mission.component';
import { NavTopComponent } from './nav-top.component';
import { SubmenuSettingComponent } from '../submenu/submenu-setting/submenu-setting.component';
import { MessageModule } from '../submenu/submenu-message/message.module';
import { RouterModule } from '@angular/router';
import { SubmenuInfoPCIComponent } from '../submenu/submenu-info-pci/submenu-info-pci.component';


@NgModule({
  declarations: [NavTopComponent, SubmenuNetworkComponent,
    SubmenuSettingComponent,
    SubmenuPlaystopComponent,
    SubmenuPayloadComponent,
    SubmenuMissionComponent,
    SubmenuInfoPCIComponent],
  imports: [
    CommonModule,
    MessageModule,
    RouterModule
  ],
  exports: [NavTopComponent]
})
export class NavTopModule {
}
