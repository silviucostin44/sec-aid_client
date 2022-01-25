import {QuestSection} from './quest-section.model';

export class Questionnaire {
  sections: QuestSection[] = [];

  constructor(sections: QuestSection[]) {
    this.sections = sections;
  }
}
