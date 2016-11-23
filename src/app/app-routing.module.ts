/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 14 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */

import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';

import './rxjs-extensions';

import { QuestionComponent }        from './question/question.component';
import { QuestionsComponent }       from './question/questions.component';
import { InstructorComponent }      from './instructor/instructor.component';
import { StudentComponent }           from './student/student.component';

const routes: Routes = [
  { path: '', redirectTo: '/questions', pathMatch: 'full' },
  { path: 'questions',  component: QuestionsComponent },
  { path: 'question',   component: QuestionComponent },
  { path: 'instructor', component: InstructorComponent },
  { path: 'student',    component: StudentComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
