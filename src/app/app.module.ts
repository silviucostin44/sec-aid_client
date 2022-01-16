import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './view/pages/home/home.component';
import {QuestionnaireComponent} from './view/pages/questionnaire/questionnaire.component';
import {ProgramComponent} from './view/pages/program/program.component';
import {PageWrapperComponent} from './view/abstract/page-wrapper/page-wrapper.component';
import {ModalWrapperComponent} from './view/abstract/modal-wrapper/modal-wrapper.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthModalComponent} from './view/modals/auth-modal/auth-modal.component';
import {RegisterModalComponent} from './view/modals/register-modal/register-modal.component';
import {UploadModalComponent} from './view/modals/upload-modal/upload-modal.component';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import {ProgressButtons} from './view/widgets/progress-buttons/progress-buttons.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CDropdownComponent} from './view/widgets/c-dropdown/c-dropdown.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ScoreComponent} from './view/widgets/score/score.component';
import {BsModalService} from 'ngx-bootstrap/modal';
import {FilesListComponent} from './view/widgets/files-list/files-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuestionnaireComponent,
    ProgramComponent,
    PageWrapperComponent,
    ModalWrapperComponent,
    AuthModalComponent,
    RegisterModalComponent,
    UploadModalComponent,
    ProgressButtons,
    CDropdownComponent,
    ScoreComponent,
    FilesListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFileUploaderModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    FontAwesomeModule,
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
