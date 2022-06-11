import {AssessmentLevelsEnum} from './enums/assessment-levels.enum';

export class RiskAssessment {
  probability: AssessmentLevelsEnum;
  impact: AssessmentLevelsEnum;
  private id: number;


  constructor() {
    this.probability = AssessmentLevelsEnum.NONE;
    this.impact = AssessmentLevelsEnum.NONE;
  }
}
