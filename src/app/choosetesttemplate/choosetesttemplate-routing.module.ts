/* ----------------------------------------------------------------------------------- */
/* Author       : Bas Smulders                                                         */
/* Date created : 09 Dec 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { NgModule }     from '@angular/core';
import { Routes,
         RouterModule } from '@angular/router';

import { ChooseTestTemplateComponent }  from './choosetesttemplate.component';
import { PreAttemptComponent }          from '../preattempt/pre-attempt.component';

const routes: Routes = [
  { path: '', redirectTo: 'browse', pathMatch: 'full'},
  { path: 'browse', component: ChooseTestTemplateComponent },
  { path: 'startattempt/:testTemplateID', component: PreAttemptComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChooseTestTemplateRoutingModule {}
