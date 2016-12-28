/* ----------------------------------------------------------------------------------- */
/* Author       : Bas Smulders                                                         */
/* Date created : 09 Dec 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { NgModule }     from '@angular/core';
import { Routes,
         RouterModule } from '@angular/router';

import { QuestionComponent }            from './question.component';
import { QuestionsComponent }           from './questions.component';
import { ShowQuestionComponent }        from './show-question.component';

const routes: Routes = [
  { path: '', redirectTo: 'browse', pathMatch: 'full'},
  { path: 'edit/:id', component: QuestionComponent }, //Edit Question. id==-1 leads to new question.
  { path: 'show/:id', component: ShowQuestionComponent },
  { path: 'browse', component: QuestionsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule {}
