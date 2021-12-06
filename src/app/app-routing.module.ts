import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './view/pages/home/home.component';
import {QuestionnaireComponent} from './view/pages/questionnaire/questionnaire.component';
import {ProgramComponent} from './view/pages/program/program.component';
import {SelfAssessmentComponent} from './view/pages/self-assessment/self-assessment.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'questionnaire/:id', component: QuestionnaireComponent},
  {path: 'questionnaire/:q_id/self-assessment/:id', component: SelfAssessmentComponent},  // todo delete: the component too
  {path: 'program/:id', component: ProgramComponent},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
