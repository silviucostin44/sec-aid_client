import {UploadedFileEnum} from '../models/enums/uploaded-file.enum';

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
}
