import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {QuestionnaireComponent} from './pages/questionnaire/questionnaire.component';
import {ProgramComponent} from './pages/program/program.component';
import {SelfAssessmentComponent} from './pages/self-assessment/self-assessment.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'questionnaire/:id', component: QuestionnaireComponent},
  {path: 'questionnaire/:q_id/self-assessment/:id', component: SelfAssessmentComponent},
  {path: 'program/:id', component: ProgramComponent},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
