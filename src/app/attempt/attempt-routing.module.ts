/* ----------------------------------------------------------------------------------- */
/* Author       : Bas Smulders                                                         */
/* Date created : 09 Dec 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { NgModule }     from '@angular/core';
import { Routes,
         RouterModule } from '@angular/router';

import { AttemptComponent }             from './attempt.component';

const routes: Routes = [
  { path: '', redirectTo: 'attempt', pathMatch: 'full'},
  { path: 'attempt', component: AttemptComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttemptRoutingModule {}
