import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingButtonDirective } from './loading-button.directive';
import { TooltipDirective } from './tooltip.directive';
import { AutofocusInputDirective } from './autofocus-input.directive';
import { DisableControlDirective } from './disable-control.directive';
import { ForbiddenValidatorDirective } from './regex-input.directive';

@NgModule({
  declarations: [LoadingButtonDirective, TooltipDirective, AutofocusInputDirective, DisableControlDirective, ForbiddenValidatorDirective],
  imports: [
    CommonModule
  ],
  exports: [LoadingButtonDirective, TooltipDirective, AutofocusInputDirective, DisableControlDirective, ForbiddenValidatorDirective]
})
export class FormDirectivesModule {
}
