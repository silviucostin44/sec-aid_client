import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './view/pages/home/home.component';
import {QuestionnaireComponent} from './view/pages/questionnaire/questionnaire.component';
import {ProgramComponent} from './view/pages/program/program.component';
import {PendingChangesGuard} from './helpers/pending-changes.guard';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'questionnaire/:id', component: QuestionnaireComponent, canDeactivate: [PendingChangesGuard]},
  {path: 'program/:id', component: ProgramComponent, canDeactivate: [PendingChangesGuard]},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
