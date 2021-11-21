export class Question {
  number: number;
  text: string;
  response: string;
  responseControlIndex: number;


  constructor(number: number, text: string, responseControlIndex: number) {
    this.number = number;
    this.text = text;
    this.responseControlIndex = responseControlIndex;
  }
}
