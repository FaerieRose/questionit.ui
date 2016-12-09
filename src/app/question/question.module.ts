/* ----------------------------------------------------------------------------------- */
/* Author       : Bas Smulders                                                         */
/* Date created : 09 Dec 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';

import { QuestionComponent }            from './question.component';
import { QuestionsComponent }           from './questions.component';
import { ShowQuestionComponent }        from './show-question.component';
import { QuestionDisplayComponent }     from './question-display.component';

import { QuestionRoutingModule }        from './question-routing.module';

@NgModule({
  imports: [ CommonModule, QuestionRoutingModule ],
  declarations: [
    QuestionComponent, 
    QuestionsComponent, 
    ShowQuestionComponent,
    QuestionDisplayComponent
  ]
})
export class QuestionModule { }