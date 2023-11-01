import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WikiListPartial} from "../partial/wiki-list.partial";
import {WikiPage} from "../page/wiki.page";
import {RouterModule} from "@angular/router";
import {ScrollableDirective} from "../directive/scrollable.directive";

@NgModule({
  declarations: [ WikiPage, WikiListPartial, ScrollableDirective],
  imports: [
      RouterModule,
      CommonModule
  ]
})
export class WikiModule { }
