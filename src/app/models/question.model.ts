import {Rated} from './rated.model';
import {Response} from './response.model';

export class Question extends Rated {
  number: number;
  text: string;
  response: Response;
  responseControlIndex: number;

  constructor(number: number, text: string, responseControlIndex: number) {
    super();
    this.number = number;
    this.text = text;
    this.responseControlIndex = responseControlIndex;
  }

  public static fromServerObject(questionObject: Question): Question {
    const newQuestion = new Question(
      questionObject.number,
      questionObject.text,
      questionObject.responseControlIndex
    );
    newQuestion.response = Response.fromServerObject(questionObject.response);
    newQuestion.setRating(questionObject.rating);
    return newQuestion;
  }

  public static fromServerListOfObjects(questionObjectList: Question[]): Question[] {
    return questionObjectList.map(Question.fromServerObject);
  }

  public getDisplay(): string {
    return this.number + '. ' + this.text;
  }
}
