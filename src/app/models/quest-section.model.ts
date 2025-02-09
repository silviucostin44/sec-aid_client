import {Rated} from './rated.model';
import {Question} from './question.model';

export class QuestSection extends Rated {
  number: string;
  title: string;
  subsections: QuestSection[] = [];
  questions?: Question[] = [];

  constructor(number: string, title: string) {
    super();
    this.number = number;
    this.title = title;
  }

  public static fromServerObject(sectionObject: QuestSection): QuestSection {
    const newSection = new QuestSection(sectionObject.number, sectionObject.title);
    newSection.subsections = QuestSection.fromServerListOfObjects(sectionObject.subsections);
    newSection.questions = Question.fromServerListOfObjects(sectionObject.questions);
    newSection.rating = sectionObject.rating;
    return newSection;
  }

  public static fromServerListOfObjects(sectionObjectList: QuestSection[]): QuestSection[] {
    return sectionObjectList.map(QuestSection.fromServerObject);
  }

  public getDisplay(): string {
    return this.number + ' ' + this.title;
  }
}
