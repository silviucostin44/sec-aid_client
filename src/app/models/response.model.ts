import {MaturityLevelEnum} from './enums/maturity-level.enum';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

export class Response {
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

  public static getResponseCriteriaKeys(): string[] {
    return ['crt_1', 'crt_2', 'crt_3', 'crt_4',];
  }

  public static formGroupToResponse(responseFormGroup: AbstractControl): Response {
    return new this(
      responseFormGroup.get('crt_1').value ? Number.parseInt(responseFormGroup.get('crt_1').value) : null,
      responseFormGroup.get('crt_2').value ? Number.parseInt(responseFormGroup.get('crt_2').value) : null,
      responseFormGroup.get('crt_3').value ? Number.parseInt(responseFormGroup.get('crt_3').value) : null,
      responseFormGroup.get('crt_4').value ? Number.parseInt(responseFormGroup.get('crt_4').value) : null
    );
  }

  public static fromServerObject(responseObject: Response): Response {
    if (!responseObject) {
      return null;
    }
    return new Response(
      MaturityLevelEnum[responseObject.approach] as unknown as MaturityLevelEnum,
      MaturityLevelEnum[responseObject.deployment] as unknown as MaturityLevelEnum,
      MaturityLevelEnum[responseObject.learning] as unknown as MaturityLevelEnum,
      MaturityLevelEnum[responseObject.integration] as unknown as MaturityLevelEnum
    );
  }

  public static buildDefaultResponseControl(): FormGroup {
    return new FormGroup({
      crt_1: new FormControl('', Validators.required),
      crt_2: new FormControl('', Validators.required),
      crt_3: new FormControl('', Validators.required),
      crt_4: new FormControl('', Validators.required)
    });
  }

  public toFormGroup(): FormGroup {
    return new FormGroup({
      crt_1: new FormControl(this.approach ? this.approach.toString() : '', Validators.required),
      crt_2: new FormControl(this.deployment ? this.deployment.toString() : '', Validators.required),
      crt_3: new FormControl(this.learning ? this.learning.toString() : '', Validators.required),
      crt_4: new FormControl(this.integration ? this.integration.toString() : '', Validators.required)
    });
  }
}
