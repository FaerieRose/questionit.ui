/* ----------------------------------------------------------------------------------- */
/* Author       : Bas Smulders                                                         */
/* Date created : 09 Dec 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';

import { AttemptComponent }         from './attempt.component';
import { QuestionDisplayComponent } from '../question/question-display.component';

import { AttemptRoutingModule }     from './attempt-routing.module';

@NgModule({
  imports: [ CommonModule, AttemptRoutingModule ],
  declarations: [
    AttemptComponent, 
    QuestionDisplayComponent
  ]
})
export class AttemptModule { }
