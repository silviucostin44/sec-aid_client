import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {QuestionnaireComponent} from './pages/questionnaire/questionnaire.component';
import {ProgramComponent} from './pages/program/program.component';
import {SelfAssessmentComponent} from './pages/self-assessment/self-assessment.component';
import {PageWrapperComponent} from './abstract/page-wrapper/page-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuestionnaireComponent,
    ProgramComponent,
    SelfAssessmentComponent,
    PageWrapperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
