import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthPage} from "./ui/page/auth.page";
import {SettingPage} from "./ui/page/setting.page";
import {SettingModule} from "./ui/module/setting.module";
import {ModalModule} from "./ui/module/modal.module";
import {AuthModule} from "./ui/module/auth.module";
import {ModalLayout} from "./ui/layout/modal.layout";
import {WikiModal} from "./ui/modal/wiki.modal";
import {PopoverModule} from "./ui/module/popover.module";
import {TagPopover} from "./ui/popover/tag.popover";
import {WikiModule} from "./ui/module/wiki.module";
import {WikiPage} from "./ui/page/wiki.page";

const routes: Routes = [
    {path: 'auth', component: AuthPage},
    {path: 'setting', component: SettingPage},
    {path: 'wiki', component: WikiPage},
    {path: 'modal', outlet: 'modal', component: ModalLayout,children : [{ path: 'tagAdd', component: WikiModal }]},
    {path: 'popover', outlet: 'modal', component: TagPopover},
    {path: '', redirectTo: 'auth', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), SettingModule,  ModalModule, AuthModule, PopoverModule, WikiModule],
  declarations : [],
  exports: [RouterModule ]
})
export class AppRoutingModule { }
