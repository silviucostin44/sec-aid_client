import {MaturityLevelEnum} from '../models/enums/maturity-level.enum';
import {QuestionnaireServer} from '../models/server-api/questionnaire-server';
import {SelectableElement} from '../view/modals/select-modal/select-modal.component';

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

  static buildQuestionnaireServerListFromSelectableElems(selectables: SelectableElement[]): QuestionnaireServer[] {
    return selectables.map((selectable) => ({
      id: selectable.id,
      name: selectable.name,
      sections: []
    } as QuestionnaireServer));
  }

  static buildSelectableElemsFromQuestionnaireServerList(serverQuests: QuestionnaireServer[]): SelectableElement[] {
    return serverQuests.map((serverQuest) => ({
      id: serverQuest.id,
      name: serverQuest.name,
    } as SelectableElement));
  }

}
