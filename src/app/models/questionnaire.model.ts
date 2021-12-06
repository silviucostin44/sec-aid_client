import {Question} from './question.model';
import {Rated} from './rated.model';

export class Questionnaire {
  sections: QuestSection[] = [];
}

export class QuestSection extends Rated {
  number: number;
  title: string;
  subsections: QuestSection[] = [];
  questions?: Question[] = [];

  constructor(number: number, title: string) {
    super();
    this.number = number;
    this.title = title;
  }
}
