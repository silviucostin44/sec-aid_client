export class ActionAnalysis {
  action: string;
  costBenefitIndex: number;
  priority: number;
  private subcategory: string;


  constructor(subcategory: string, action: string, costBenefitIndex: number, priority: number) {
    this.action = action;
    this.costBenefitIndex = costBenefitIndex;
    this.priority = priority;
    this.subcategory = subcategory;
  }
}
