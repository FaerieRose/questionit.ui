/* ----------------------------------------------------------------------------------- */
/* Author       : Bas Smulders                                                         */
/* Date created : 09 Dec 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';

import { AttemptComponent }       from './attempt.component';

import { QuestionDisplayModule }  from '../question/question-display.module';
import { AttemptRoutingModule }   from './attempt-routing.module';

@NgModule({
  imports: [ 
    CommonModule,
    AttemptRoutingModule, 
    QuestionDisplayModule 
  ],
  declarations: [
    AttemptComponent
  ]
})
export class AttemptModule { }
