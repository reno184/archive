import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

export function forbiddenInputValidator(myExpression: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = myExpression.test(control.value);
    return forbidden ? null : { forbiddenInput: { value: control.value } };
  };
}

@Directive({
  selector: '[appForbiddenInput]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true }]
})
export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenInput') forbiddenInput: string;

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.forbiddenInput ? forbiddenInputValidator(new RegExp(this.forbiddenInput, 'i'))(control) : null;
  }
}
