import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {QuestionnaireComponent} from './pages/questionnaire/questionnaire.component';
import {ProgramComponent} from './pages/program/program.component';
import {SelfAssessmentComponent} from './pages/self-assessment/self-assessment.component';
import {PageWrapperComponent} from './abstract/page-wrapper/page-wrapper.component';
import {ModalWrapperComponent} from './abstract/modal-wrapper/modal-wrapper.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthModalComponent} from './modals/auth-modal/auth-modal.component';
import {RegisterModalComponent} from './modals/register-modal/register-modal.component';
import {UploadModalComponent} from './modals/upload-modal/upload-modal.component';
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
