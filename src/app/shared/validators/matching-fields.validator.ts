import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function MatchingFieldsValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {
    const passwordControl: AbstractControl | null = control.get('password');
    const confirmPasswordControl: AbstractControl | null = control.get('confirmPassword');

    let passwordsMatch: boolean = false;

    if(passwordControl && confirmPasswordControl && confirmPasswordControl.value === passwordControl?.value) passwordsMatch = true;

    return !passwordsMatch ? {noMatch:true}: null;
  }
}
