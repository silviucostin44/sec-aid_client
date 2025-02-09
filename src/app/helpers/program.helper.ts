import {UploadedFileEnum} from '../models/enums/uploaded-file.enum';
import {FieldType} from '../view/widgets/table/table.component';
import {Program} from '../models/program.model';
import {SelectableElement} from '../view/modals/select-modal/select-modal.component';
import {ImplementationTierEnum} from '../models/enums/implementation-tier.enum';

export default class ProgramHelper {

  static getFileTypeFromStep(step: number): UploadedFileEnum {
    switch (step) {
      case 1:
        return UploadedFileEnum.ASSETS_INVENTORY;
      case 2:
        return UploadedFileEnum.THREAT_ANALYSIS;
      case 3:
        return UploadedFileEnum.TARGET_PROFILE;
      case 4:
        return UploadedFileEnum.RISK_ASSESSMENT;
      case 5:
        return UploadedFileEnum.CURRENT_PROFILE;
      case 6:
        return UploadedFileEnum.ACTIONS_PRIORITY;
      case 7:
        return UploadedFileEnum.IMPLEMENTATION_DOC;
      default:
        throw Error('Invalid argument step: ' + step);
    }

  }

  static getFormControlDefaultValue(editor: FieldType): any {
    switch (editor) {
      case 'boolean':
        return false;
      case 'numeric':
        return 0;
      case 'text':
        return '';
      case 'date':
        return new Date();
      case undefined:
        return;
      default:
        throw new Error('Illegal argument: ' + editor);
    }
  }

  static buildProgramListFromSelectableElems(selectables: SelectableElement[]): Program[] {
    return selectables.map((selectable) => new Program(selectable.id, selectable.name));
  }

  static buildSelectableElemsFromProgramList(programs: Program[]): SelectableElement[] {
    return programs.map((program) => ({
      id: String(program.id),
      name: program.name
    } as SelectableElement));
  }

  static getImplementationTiersAsList(): string[] {
    return [
      ImplementationTierEnum.PARTIAL.toString(),
      ImplementationTierEnum.RISK_INFORMED.toString(),
      ImplementationTierEnum.REPEATABLE.toString(),
      ImplementationTierEnum.ADAPTIVE.toString(),
    ];
  }
}
