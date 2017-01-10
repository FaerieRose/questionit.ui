/* ----------------------------------------------------------------------------------- */
/* Author       : Bas Smulders                                                         */
/* Date created : 09 Dec 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';

import { QuestionComponent }     from './question.component';
import { QuestionsComponent }    from './questions.component';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionDisplayModule } from './question-display.module';

@NgModule({
  imports: [ 
    CommonModule, 
    QuestionRoutingModule, 
    QuestionDisplayModule 
  ],
  declarations: [
    QuestionComponent, 
    QuestionsComponent
  ]
})
export class QuestionModule { }
