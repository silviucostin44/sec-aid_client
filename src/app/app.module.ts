import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './view/pages/home/home.component';
import {QuestionnaireComponent} from './view/pages/questionnaire/questionnaire.component';
import {ProgramComponent} from './view/pages/program/program.component';
import {PageWrapperComponent} from './view/wrappers/page-wrapper/page-wrapper.component';
import {ModalWrapperComponent} from './view/wrappers/modal-wrapper/modal-wrapper.component';
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
import {PendingChangesGuard} from './helpers/pending-changes.guard';
import {LoadingCardComponent} from './view/widgets/loading-card/loading-card.component';
import {SelectModalComponent} from './view/modals/select-modal/select-modal.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './http-interceptors/auth-interceptor';
import {AccountToolComponent} from './view/widgets/account-tool/account-tool.component';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {DatePipe} from '@angular/common';
import {GuestModeStepsComponent} from './view/pages/program/steps/guest-mode-steps/guest-mode-steps.component';
import {GridModule} from '@progress/kendo-angular-grid';
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import {CheckBoxModule} from '@progress/kendo-angular-inputs';
import {TableComponent} from './view/widgets/table/table.component';
import {DropDownListModule} from '@progress/kendo-angular-dropdowns';
import {ActionAnalysisTableComponent} from './view/pages/program/steps/interactive-mode-steps/action-analysis-table/action-analysis-table.component';
import {InteractiveModeStepsComponent} from './view/pages/program/steps/interactive-mode-steps/interactive-mode-steps.component';
import {ThreatAnalysisTableComponent} from './view/pages/program/steps/interactive-mode-steps/threat-analysis-table/threat-analysis-table.component';


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
    LoadingCardComponent,
    SelectModalComponent,
    AccountToolComponent,
    GuestModeStepsComponent,
    TableComponent,
    ActionAnalysisTableComponent,
    InteractiveModeStepsComponent,
    ThreatAnalysisTableComponent
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
    TooltipModule,
    PopoverModule,
    GridModule,
    ButtonsModule,
    CheckBoxModule,
    DropDownListModule
  ],
  providers: [
    BsModalService,
    PendingChangesGuard,
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
