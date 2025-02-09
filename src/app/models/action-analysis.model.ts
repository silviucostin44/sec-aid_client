export class ActionAnalysis {
  action: string;
  costBenefitIndex: number;
  priority: number;
  id: number;
  private subcategory: string;

  constructor(id: number, subcategory: string, action: string, costBenefitIndex: number, priority: number) {
    this.id = id;
    this.action = action;
    this.costBenefitIndex = costBenefitIndex;
    this.priority = priority;
    this.subcategory = subcategory;
  }
}
