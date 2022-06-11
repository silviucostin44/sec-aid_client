import {ColumnSetting} from '../view/widgets/table/table.component';
import {Validators} from '@angular/forms';
import ro from 'src/assets/text/ro.json';

const text = ro.PROGRAM;

export const assetInventoryColumns: ColumnSetting[] = [
  {
    field: 'type',
    title: text.STEP_1.TABLE.COLUMNS.TYPE,
    editable: true,
    editor: 'text',
  },
  {
    field: 'name',
    title: text.STEP_1.TABLE.COLUMNS.NAME,
    editable: true,
    editor: 'text',
  },
  {
    field: 'description',
    title: text.STEP_1.TABLE.COLUMNS.DESCRIPTION,
    editable: true,
    editor: 'text',
  },
  {
    field: 'infoType',
    title: text.STEP_1.TABLE.COLUMNS.INFO_TYPE,
    editable: true,
    editor: 'text',
  },
  {
    field: 'isClientAsset',
    title: text.STEP_1.TABLE.COLUMNS.CLIENT_DATA,
    editable: true,
    editor: 'text',
  },
  {
    field: 'visibility',
    title: text.STEP_1.TABLE.COLUMNS.CLASSIFICATION,
    editable: true,
    editor: 'text',
  },
  {
    field: 'owner',
    title: text.STEP_1.TABLE.COLUMNS.ASSET_OWNER,
    editable: true,
    editor: 'text',
  },
];

export const assetInventoryColumnsValidators = {
  type: Validators.required,
  name: Validators.required,
};

export const threatAnalysisColumns: ColumnSetting[] = [
  {
    field: 'type',
    title: text.STEP_1.TABLE.COLUMNS.TYPE,
    editable: false,
  },
  {
    field: 'name',
    title: text.STEP_1.TABLE.COLUMNS.NAME,
    editable: false,
  },
  {
    field: 'regulations',
    title: text.STEP_2.TABLE.COLUMNS.REGULATIONS,
    editable: true,
    editor: 'text',
  },
  {
    field: 'vulnerabilities',
    title: text.STEP_2.TABLE.COLUMNS.VULNERABILITIES,
    editable: true,
    editor: 'text',
  },
  {
    field: 'threats',
    title: text.STEP_2.TABLE.COLUMNS.THREATS,
    editable: true,
    editor: 'text',
  },
];

export const profileColumns: ColumnSetting[] = [
  {
    field: 'function',
    title: text.STEP_3.TABLE.COLUMNS.FUNCTION,
    editable: false,
  },
  {
    field: 'category',
    title: text.STEP_3.TABLE.COLUMNS.CATEGORY,
    editable: false,
  },
  {
    field: 'subcategory',
    title: text.STEP_3.TABLE.COLUMNS.SUBCATEGORY,
    editable: false,
  },
  {
    field: 'implementationLevel',
    title: text.STEP_3.TABLE.COLUMNS.IMPLEMENTATION_LEVEL,
    editable: true,
    editor: 'numeric'
  },
  {
    field: 'impactRate',
    title: text.STEP_3.TABLE.COLUMNS.IMPACT_RATE,
    editable: false,
  },
  {
    field: 'priorityCode',
    title: text.STEP_3.TABLE.COLUMNS.PRIORITY_CODE,
    editable: false,
  }
];

export const profileColumnsValidators = {
  implementationLevel: Validators.compose([
    Validators.required,
    Validators.pattern('[0-3]')
  ]),
};

export const riskAssessmentColumns: ColumnSetting[] = [
  {
    field: 'resource',
    title: text.STEP_4.TABLE.COLUMNS.RESOURCE,
    editable: false,
  },
  {
    field: 'probability',
    title: text.STEP_4.TABLE.COLUMNS.PA,
    editable: true,
    editor: 'numeric'
  },
  {
    field: 'impact',
    title: text.STEP_4.TABLE.COLUMNS.IMPACT,
    editable: true,
    editor: 'numeric'
  },
  {
    field: 'riskLevel',
    editable: false,
    title: text.STEP_4.TABLE.COLUMNS.RISK_LEVEL,
  }
];

export const riskAssessmentColumnsValidators = {
  probability: Validators.compose([
    Validators.required,
    Validators.pattern('[0-3]')
  ]),
  impact: Validators.compose([
    Validators.required,
    Validators.pattern('[0-3]')
  ]),
};

export const actionAnalysisColumns: ColumnSetting[] = [
  {
    field: 'action',
    title: text.STEP_6.TABLE.COLUMNS.ACTION,
    editable: true,
    editor: 'text'
  },
  {
    field: 'impact',
    title: text.STEP_6.TABLE.COLUMNS.IMPACT_RATE,
    editable: false,
  },
  {
    field: 'implementationLevel',
    editable: false,
    title: text.STEP_6.TABLE.COLUMNS.IMPLEMENTATION_LEVEL,
  },
  {
    field: 'riskScore',
    title: text.STEP_6.TABLE.COLUMNS.RISK_SCORE,
    editable: false,
  },
  {
    field: 'costBenefitIndex',
    title: text.STEP_6.TABLE.COLUMNS.CORE_BENEFIT_INDEX,
    editable: true,
    editor: 'numeric'
  },
  {
    field: 'priorityCode',
    title: text.STEP_6.TABLE.COLUMNS.PRIORITY_CODE,
    editable: false,
  },
  {
    field: 'priority',
    title: text.STEP_6.TABLE.COLUMNS.PRIORITY,
    editable: true,
    editor: 'numeric'
  }
];
