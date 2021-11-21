import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './view/pages/home/home.component';
import {QuestionnaireComponent} from './view/pages/questionnaire/questionnaire.component';
import {ProgramComponent} from './view/pages/program/program.component';
import {SelfAssessmentComponent} from './view/pages/self-assessment/self-assessment.component';
import {PageWrapperComponent} from './view/abstract/page-wrapper/page-wrapper.component';
import {ModalWrapperComponent} from './view/abstract/modal-wrapper/modal-wrapper.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthModalComponent} from './view/modals/auth-modal/auth-modal.component';
import {RegisterModalComponent} from './view/modals/register-modal/register-modal.component';
import {UploadModalComponent} from './view/modals/upload-modal/upload-modal.component';
import {AngularFileUploaderModule} from 'angular-file-uploader';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuestionnaireComponent,
    ProgramComponent,
    SelfAssessmentComponent,
    PageWrapperComponent,
    ModalWrapperComponent,
    AuthModalComponent,
    RegisterModalComponent,
    UploadModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFileUploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
