import {Question} from './question.model';

export class Questionnaire {
  sections: QuestSection[] = [];
}

export class QuestSection {
  number: number;
  title: string;
  subsections: QuestSection[] = [];
  questions?: Question[] = [];

  constructor(number: number, title: string) {
    this.number = number;
    this.title = title;
  }
}
