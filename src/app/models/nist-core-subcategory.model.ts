import {AssessmentLevelsEnum} from './enums/assessment-levels.enum';
import {ActionAnalysis} from './action-analysis.model';

export class NistCoreSubcategory {
  id: number;

  subcategory: string;

  implementationLevel: AssessmentLevelsEnum;

  actionAnalysis: ActionAnalysis;

  constructor(subcategory: string, implementationLevel: AssessmentLevelsEnum) {
    this.subcategory = subcategory;
    this.implementationLevel = implementationLevel;
  }
}
