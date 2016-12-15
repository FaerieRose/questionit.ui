/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 14 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import './rxjs-extensions';

//import { QuestionComponent }     from './question/question.component';
//import { ShowQuestionComponent } from './question/show-question.component';
//import { QuestionsComponent }    from './question/questions.component';
import { StudentComponent }      from './student/student.component';
import { StudentClassComponent}  from './studentclasses/studentclass.component';
import { CreateTestComponent}    from './createtest/createtest.component';
import { AttemptScoreComponent}  from './attempt/attemptscore.component';
//import { ChooseTestTemplateComponent}  from './choose-testtemplate/choose-testtemplate.component';

const routes: Routes = [
  { path: '', redirectTo: '/question/browse', pathMatch: 'full' },
  { path: 'instructor',         loadChildren: 'app/instructor/instructor.module#InstructorModule' },
  { path: 'question',           loadChildren: 'app/question/question.module#QuestionModule' },
  { path: 'studentclasses',     component: StudentClassComponent },
  { path: 'student',            component: StudentComponent },
  { path: 'createtest',         component: CreateTestComponent },
  { path: 'attemptscore/:id',   component: AttemptScoreComponent },
  { path: 'choosetesttemplate', loadChildren: 'app/choosetesttemplate/choosetesttemplate.module#ChooseTestTemplateModule' }
  //{ path: 'choosetesttemplate', loadChildren: 'app/ctt/ctt.module#CttModule' }
  //{ path: 'choosetesttemplate',           loadChildren: 'app/question/question-a.module#QuestionModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
