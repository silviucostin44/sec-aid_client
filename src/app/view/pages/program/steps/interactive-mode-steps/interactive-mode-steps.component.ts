import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import ro from '../../../../../../assets/text/ro.json';
import {ColumnSetting} from '../../../../widgets/table/table.component';
import * as TableConfigs from '../../../../../constants/program-tables-configs';
import {Program} from '../../../../../models/program.model';
import {ProgramService} from '../../../../../services/program.service';
import {ElementStartEnum} from '../../../../../models/enums/element-start.enum';
import {CONSTANTS, RISK_SCORE_FUNCTION} from '../../../../../constants/global-constants';
import {DatePipe} from '@angular/common';
import ProgramHelper from '../../../../../helpers/program.helper';
import {UploadDownloadService} from '../../../../../services/upload-download.service';
import {TemplateFileEnum} from '../../../../../models/enums/template-file.enum';
import {FileService} from '../../../../../services/file.service';
import {ProfileTemplate} from '../../../../../constants/profile-template';
import {Profile} from '../../../../../models/profile.model';
import {FormControl, Validators} from '@angular/forms';
import {AssessmentLevelsEnum} from '../../../../../models/enums/assessment-levels.enum';
import {RiskAssessment} from '../../../../../models/risk-assessment.model';
import {NistCoreSubcategory} from '../../../../../models/nist-core-subcategory.model';
import {ActionAnalysis} from '../../../../../models/action-analysis.model';

@Component({
  selector: 'app-interactive-mode-steps',
  templateUrl: './interactive-mode-steps.component.html',
  styleUrls: ['../../program.component.scss']
})
export class InteractiveModeStepsComponent implements OnInit {
  readonly text = ro.PROGRAM;
  @Input() saveDataEmitter: EventEmitter<any>;
  @Output() isStepValid = new EventEmitter();
  currentStep: number;
  program: Program;
  implementationTiersOptions: string[] = ProgramHelper.getImplementationTiersAsList();
  profileImplementationTierControl = new FormControl(null, Validators.required);
  profileExportData = new Map<string, number>();
  assetIdSessionCounter = -1;
  // grid inputs
  columns: ColumnSetting[];
  columnFieldsValidators: any;
  data: any[] = [];

  // grid equations
  riskAssessmentColumnEquation = [((formGroup) => {
    formGroup.patchValue({riskLevel: (formGroup.value.probability + formGroup.value.impact)});
  })];

  constructor(private programService: ProgramService,
              private datePipe: DatePipe,
              private uploadDownloadService: UploadDownloadService,
              private fileService: FileService,) {
  }

  @Input() set programId(id: string) {
    if (id === ElementStartEnum.NEW) {
      this.program = new Program(null, 'Program-' + this.datePipe.transform(new Date(), CONSTANTS.dateFormat));
      if (this.currentStep) {
        this.initTable(this.currentStep);
      }
    } else if (id) {
      this.programService.getProgram(Number(id)).subscribe((program) => {
        this.program = program;
        if (this.currentStep) {
          this.initTable(this.currentStep);
        }
      });
    }
  };

  @Input() set step(value: number) {
    if (this.currentStep) {
      // if step is changing update program data
      this.updateProgramWithData();
    }
    this.currentStep = value;
    if (value) {
      this.initTable(value);
    }
  };

  ngOnInit(): void {
    this.saveDataEmitter.subscribe(() => {
      this.updateProgramWithData();
      this.programService.saveProgram(this.program).subscribe((program) => {
        this.program = program;
      });
    });

    this.profileImplementationTierControl.valueChanges.subscribe((value) => this.isStepValid.emit(!!value && value !== ''));
  }

  translateImplementationTiers(implTier: string): string {
    return ro.PROGRAM.STEP_3.IMPLEMENTATION_TIERS[implTier];
  }

  downloadFrameworkCoreTemplate() {
    this.uploadDownloadService.openDownload(this.fileService.getTemplateUrl(TemplateFileEnum.NIST_FRAMEWORK_CORE));
  }

  downloadImplementationTiersTemplate() {
    this.uploadDownloadService.openDownload(this.fileService.getTemplateUrl(TemplateFileEnum.IMPLEMENTATION_TIERS));
  }

  stepOneAndSixDataChange(): void {
    this.isStepValid.emit(this.data.length > 0);
  }

  checkProfileValidity(): void {
    this.isStepValid.emit(!!this.profileImplementationTierControl.value && this.profileImplementationTierControl.value !== '');
  }

  private initTable(step: number): void {
    this.data = [];
    switch (step) {
      case 1: {
        this.columns = TableConfigs.assetInventoryColumns;
        this.columnFieldsValidators = TableConfigs.assetInventoryColumnsValidators;
        if (this.program) {
          this.data = this.program.assets ? this.program.assets : [];
        }
        this.stepOneAndSixDataChange();
        break;
      }
      case 2: {
        this.setThreatAnalysisData();
        this.isStepValid.emit(true);
        break;
      }
      case 3: {
        this.setProfileData(this.program.targetProfile);
        if (!this.program.targetProfile) {
          this.program.targetProfile = new Profile();
        }
        this.checkProfileValidity();
        break;
      }
      case 4: {
        this.setRiskAssessmentData();
        this.isStepValid.emit(true);
        break;
      }
      case 5: {
        this.setProfileData(this.program.currentProfile);
        if (!this.program.currentProfile) {
          this.program.currentProfile = new Profile();
        }
        this.checkProfileValidity();
        break;
      }
      case 6:
        this.setActionAnalysisData();
        this.stepOneAndSixDataChange();
        break;
      case 7: {
        break;
      }
      default:
        throw new Error('Illegal step value argument: ' + step);
    }
  }

  private updateProgramWithData(): void {
    switch (this.currentStep) {
      case 1:
        this.program.assets = this.data;
        break;
      case 2:
        for (let dataObject of this.data) {
          const asset = this.program.assets.find((asset) => asset.id === dataObject.id);
          asset.regulations = dataObject.regulations;
          asset.vulnerabilities = dataObject.vulnerabilities;
          asset.threats = dataObject.threats;
        }
        break;
      case 3:
        this.updateProfileFromData(this.program.targetProfile);
        break;
      case 4:
        this.updateRiskAssessmentFromData();
        break;
      case 5:
        this.updateProfileFromData(this.program.currentProfile);
        break;
      case 6:
        this.updateActionAnalysisFromData();
        break;
      case 7:
        break;
      default:
        throw new Error('Illegal state step value of: ' + this.currentStep);
    }
  }

  /**
   * Step 3 and 5 table data initialisation.
   * @param profile the profile to get data from.
   * @private
   */
  private setProfileData(profile: Profile): void {
    this.columns = TableConfigs.profileColumns;
    this.columnFieldsValidators = TableConfigs.profileColumnsValidators;
    if (profile) {
      // get profile data
      this.profileImplementationTierControl.setValue(profile.implementationTier);
      this.data = profile.nistCoreSubcategoryList.map((core) => {
        const dataObject = ProfileTemplate[core.subcategory];
        dataObject['subcategory'] = core.subcategory;
        dataObject['implementationLevel'] = core.implementationLevel;
        return dataObject;
      });
    } else {
      // generate default data
      this.profileImplementationTierControl.reset();
      this.data = Object.keys(ProfileTemplate).map((profileElemKey) => {
        const dataObject = ProfileTemplate[profileElemKey];
        dataObject['subcategory'] = profileElemKey;
        dataObject['implementationLevel'] = AssessmentLevelsEnum.NONE;
        return dataObject;
      });
    }
  }

  /**
   * Step 3 and 5 program update with table data.
   * @param profile the profile to update.
   * @private
   */
  private updateProfileFromData(profile: Profile): void {
    profile.implementationTier = this.profileImplementationTierControl.value;
    for (let dataObject of this.data) {
      // set profile export data to be used in step 6
      if (this.currentStep === 5) {
        this.profileExportData.set(dataObject.subcategory, dataObject.implementationLevel);
      }
      // update nist core subcategory implementation level
      const nistCoreSubcategory = profile.nistCoreSubcategoryList.find((core) =>
        core.subcategory = dataObject.subcategory);
      if (nistCoreSubcategory) {
        nistCoreSubcategory.implementationLevel = dataObject.implementationLevel;
      } else {
        profile.nistCoreSubcategoryList.push(new NistCoreSubcategory(dataObject.subcategory,
          dataObject.implementationLevel));
      }
    }
  }

  /**
   * Step 4 table data initialisation.
   * @private
   */
  private setRiskAssessmentData(): void {
    this.columns = TableConfigs.riskAssessmentColumns;
    this.columnFieldsValidators = TableConfigs.riskAssessmentColumnsValidators;
    if (this.program && this.program.assets) {
      this.data = this.program.assets.map((asset) => {
        if (!asset.riskAssessment) {
          asset.riskAssessment = new RiskAssessment();
        }
        return {
          id: asset.id,
          resource: asset.name,
          probability: asset.riskAssessment.probability,
          impact: asset.riskAssessment.impact,
          riskLevel: asset.riskAssessment.probability + asset.riskAssessment.impact
        };
      });
    }
  }

  /**
   * Step 4 program update from table data.
   * @private
   */
  private updateRiskAssessmentFromData(): void {
    for (let dataObject of this.data) {
      for (let asset of this.program.assets) {
        if (dataObject.id === asset.id) {
          asset.riskAssessment.probability = dataObject.probability;
          asset.riskAssessment.impact = dataObject.impact;
          break;
        }
      }
    }
  }

  /**
   * Step 6 action analysis on program update form table data.
   * @private
   */
  private updateActionAnalysisFromData(): void {
    for (let nistCoreSubcategory of this.program.currentProfile.nistCoreSubcategoryList) {
      let dataObject = this.data.find((dataObject) => dataObject.subcategory === nistCoreSubcategory.subcategory);
      if (dataObject) {
        nistCoreSubcategory.actionAnalysis = new ActionAnalysis(
          dataObject.subcategory,
          dataObject.action,
          dataObject.costBenefitIndex,
          dataObject.priority
        );
      } else {
        nistCoreSubcategory.actionAnalysis = null;
      }
    }
  }

  /**
   * Step 2 threat analysis data set.
   * @private
   */
  private setThreatAnalysisData(): void {
    // give new assets temporary negative id
    for (let asset of this.program.assets) {
      if (!asset.id) {
        asset.id = this.assetIdSessionCounter--;
      }
    }
    this.data = this.program.assets.map((asset) => ({
      id: asset.id,
      type: asset.type,
      name: asset.name,
      regulations: asset.regulations ? asset.regulations : [],
      vulnerabilities: asset.vulnerabilities ? asset.vulnerabilities : [],
      threats: asset.threats ? asset.threats : []
    }));
  }

  /**
   * Step 6 data setting with action analysis.
   * @private
   */
  private setActionAnalysisData(): void {
    this.data = [];
    this.program.currentProfile.nistCoreSubcategoryList.forEach((core) => {
      if (core.actionAnalysis) {
        this.data.push({
          subcategory: core.subcategory,
          action: core.actionAnalysis.action,
          impact: ProfileTemplate[core.subcategory].impactRate,
          priorityCode: ProfileTemplate[core.subcategory].priorityCode,
          priority: core.actionAnalysis.priority,
          costBenefitIndex: core.actionAnalysis.costBenefitIndex,
          implementationLevel: core.implementationLevel,
          riskScore: RISK_SCORE_FUNCTION(1, ProfileTemplate[core.subcategory].impactRate)
        });
      }
    });
  }
}
