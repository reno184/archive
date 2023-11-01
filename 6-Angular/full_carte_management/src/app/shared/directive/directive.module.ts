import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutofocusInputDirective} from "./autofocus.directive";
import {OrderByPipe} from './order-by.pipe';

@NgModule({
    declarations: [AutofocusInputDirective, OrderByPipe],
    imports: [
        CommonModule
    ],
    exports: [AutofocusInputDirective, OrderByPipe]
})
export class DirectivesModule {
}
