import {MaturityLevelEnum} from '../models/enums/maturity-level.enum';

export default class QuestionnaireHelper {

  static getColorFromMaturityLevel(maturityLevel: MaturityLevelEnum): string {
    switch (maturityLevel) {
      case MaturityLevelEnum.REACTIVE:
        return 'purple';
      case MaturityLevelEnum.EARLY:
        return 'red';
      case MaturityLevelEnum.DEVELOPING:
        return '#ebeb13';
      case MaturityLevelEnum.MATURE:
        return 'orange';
      case MaturityLevelEnum.LEADING:
        return 'blue';
      case MaturityLevelEnum.EXEMPLARY:
        return 'green';
      default:
        return '';
    }
  }

  static getMaturityLevelsAsList(): string[] {
    return [
      MaturityLevelEnum.NONE.toString(),
      MaturityLevelEnum.REACTIVE.toString(),
      MaturityLevelEnum.EARLY.toString(),
      MaturityLevelEnum.DEVELOPING.toString(),
      MaturityLevelEnum.MATURE.toString(),
      MaturityLevelEnum.LEADING.toString(),
      MaturityLevelEnum.EXEMPLARY.toString()
    ];
  }

  static getResponseCriteriaKeys(): string[] {
    return ['crt_1', 'crt_2', 'crt_3', 'crt_4',];
  }
}
