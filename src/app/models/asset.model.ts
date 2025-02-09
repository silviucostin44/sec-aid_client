import {RiskAssessment} from './risk-assessment.model';
import {AssetAttributes} from './asset-attributes.model';

export class Asset {
  name: string;
  riskAssessment: RiskAssessment;
  id: number;
  type: string;
  regulations: AssetAttributes[];
  vulnerabilities: AssetAttributes[];
  threats: AssetAttributes[];
  private description: string;
  private infoType: string;
  private isClientAsset: boolean;
  private visibility: string;
  private owner: string;
}
