import {Component, OnInit} from '@angular/core';
import ro from 'src/assets/text/ro.json';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  text = ro.HOME;

  questionnaireId = '0';
  programId = '0';

  constructor() {
  }

  ngOnInit(): void {
  }
}

