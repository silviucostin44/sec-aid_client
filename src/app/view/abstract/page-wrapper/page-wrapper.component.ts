import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';
import ro from 'src/assets/text/ro.json';

@Component({
  selector: '' +
    'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss']
})
export class PageWrapperComponent implements OnInit {
  text = ro.PAGE;

  @Output() save = new EventEmitter();

  constructor(private location: Location) {
  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  saveAction(): void {
    this.save.emit();
  }

}
