import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {XsMenuComponent} from "./xs-menu/xs-menu.component";
import {MdMenuComponent} from "./md-menu/md-menu.component";
import {LgMenuComponent} from "./lg-menu/lg-menu.component";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [
        LgMenuComponent,
        XsMenuComponent,
        MdMenuComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ], exports: [
        LgMenuComponent,
        XsMenuComponent,
        MdMenuComponent
    ]
})
export class MenuModule {
}
