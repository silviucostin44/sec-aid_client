import {MaturityLevelEnum} from './enums/maturity-level.enum';
import {AbstractControl} from '@angular/forms';

export class Response {   /*todo refactor: replace class with list of criteria*/
  approach: MaturityLevelEnum;
  deployment: MaturityLevelEnum;
  learning: MaturityLevelEnum;
  integration: MaturityLevelEnum;

  constructor(approach: MaturityLevelEnum, deployment: MaturityLevelEnum, learning: MaturityLevelEnum, integration: MaturityLevelEnum) {
    this.approach = approach;
    this.deployment = deployment;
    this.learning = learning;
    this.integration = integration;
  }

  static formGroupToResponse(responseFormGroup: AbstractControl): Response {
    return new this(
      responseFormGroup.get('crt_1').value ? Number.parseInt(responseFormGroup.get('crt_1').value) : 0,
      responseFormGroup.get('crt_2').value ? Number.parseInt(responseFormGroup.get('crt_2').value) : 0,
      responseFormGroup.get('crt_3').value ? Number.parseInt(responseFormGroup.get('crt_3').value) : 0,
      responseFormGroup.get('crt_4').value ? Number.parseInt(responseFormGroup.get('crt_4').value) : 0
    );
  }

  computeRating(): number {
    // rating is rounded on first decimal
    return Math.round((this.approach + this.deployment + this.learning + this.integration) / 4 * 10) / 10;
  }
}
