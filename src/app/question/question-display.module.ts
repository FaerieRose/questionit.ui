/* ----------------------------------------------------------------------------------- */
/* Author       : Bas Smulders                                                         */
/* Date created : 10 Jan 2017                                                          */
/* This module allows the QuestionDisplayComponent to be used in different components. */
/* It takes care of the declation of QuestionDisplayComponent, which can then be       */
/* imported in the components that need it.                                            */
/* ----------------------------------------------------------------------------------- */

import { NgModule }        from '@angular/core';

import { QuestionDisplayComponent } from './question-display.component';

@NgModule({
  declarations: [ QuestionDisplayComponent ],
  exports: [ QuestionDisplayComponent ]
})
export class QuestionDisplayModule { }
