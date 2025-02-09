import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const matchingPassValidator: ValidatorFn = (groupControl: AbstractControl):
  ValidationErrors | null => {
  const pass = groupControl.get('password');
  const confirmPass = groupControl.get('confirmPass');
  return pass.value !== confirmPass.value ? {unmatchingPass: true} : null;
};
