/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 14 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import './rxjs-extensions';

import { QuestionComponent }        from './question/question.component';

const routes: Routes = [
  { path: '', redirectTo: '/question', pathMatch: 'full' },
  { path: 'question',  component: QuestionComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
