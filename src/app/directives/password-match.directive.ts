import { Directive, Input } from '@angular/core';
import { AbstractControl, NgModel, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, FormControl } from '@angular/forms';

export function passwordMatchValidator ( fieldToCompare?: NgModel | FormControl): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    if (!fieldToCompare)
      return null;
    return fieldToCompare.enabled && fieldToCompare.value !== control.value ? { passwordNotMatch: true } : null;
  }
}

@Directive({
  selector: '[passwordMatch]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordMatchValidatorDirective, multi: true }],
  standalone: true
})
export class PasswordMatchValidatorDirective implements Validator {
  @Input('passwordMatch') fieldToCompare?: NgModel | FormControl;

  validate(control: AbstractControl): ValidationErrors | null {
    return passwordMatchValidator(this.fieldToCompare)(control);
  }
}