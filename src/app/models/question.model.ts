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
}
