import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  modalTitle: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  openLoginModal() {
    this.modalTitle = 'Înregistrare';
  }

  openAuthModal() {
    this.modalTitle = 'Autentificare';
  }
}
