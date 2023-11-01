import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {TagPopover} from "../popover/tag.popover";
import {StickyDirective} from "../directive/sticky.directive";

@NgModule({
  declarations: [
      TagPopover,StickyDirective
  ],
  imports: [
    CommonModule,RouterModule
  ]
})
export class PopoverModule { }
