/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 14 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import './rxjs-extensions';

import { QuestionComponent } from './question/question.component';
import { ShowQuestionComponent } from './question/show-question.component';
import { QuestionsComponent } from './question/questions.component';
import { InstructorComponent } from './instructor/instructor.component';
import { InstructorsComponent } from './instructor/instructors.component';
import { BindInstructorToClassComponent } from './instructor/bindinstructortoclass.component';
import { StudentComponent } from './student/student.component';
import { StudentClassComponent} from './studentclasses/studentclass.component';

const routes: Routes = [
  { path: '', redirectTo: '/questions', pathMatch: 'full' },
  { path: 'questions', component: QuestionsComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'showquestion', component: ShowQuestionComponent },
  { path: 'instructor', component: InstructorComponent },
  { path: 'instructors', component: InstructorsComponent },
  { path: 'bindinstructortoclass', component: BindInstructorToClassComponent },
  { path: 'studentclasses', component: StudentClassComponent },
  { path: 'student', component: StudentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
