/* ----------------------------------------------------------------------------------- */
/* Author       : Bas Smulders                                                         */
/* Date created : 09 Dec 2016                                                          */
/* ----------------------------------------------------------------------------------- */
// import { NgModule }            from '@angular/core';
// import { CommonModule }        from '@angular/common';

// import { QuestionComponent }            from '../question/question.component';
// import { QuestionsComponent }           from '../question/questions.component';
// import { ShowQuestionComponent }        from '../question/show-question.component';
// import { QuestionDisplayComponent }     from '../question/question-display.component';

// import { QuestionRoutingModule }        from '../question/question-routing.module';

// @NgModule({
//   imports: [ CommonModule, QuestionRoutingModule ],
//   declarations: [
//     QuestionComponent, 
//     QuestionsComponent, 
//     ShowQuestionComponent,
//     QuestionDisplayComponent
//   ]
// })

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
