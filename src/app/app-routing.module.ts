/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 14 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import './rxjs-extensions';

//import { QuestionComponent }     from './question/question.component';
//import { ShowQuestionComponent } from './question/show-question.component';
import { LoginComponent }               from './login/login.component';
import { StudentComponent }             from './student/student.component';
import { StudentClassComponent}         from './studentclasses/studentclass.component';
import { CreateTestComponent}           from './createtest/createtest.component';
import { AttemptScoreComponent}         from './attempt/attemptscore.component';
//import { AttemptComponent}              from './attempt/attempt.component';
//import { ChooseTestTemplateComponent}  from './choose-testtemplate/choose-testtemplate.component';
import { StudentReviewComponent }       from './student/studentreview.component';
import { StudentLoginComponent }        from './student/studentlogin.component';
import { StudentPostAttemptComponent }  from './student/studentpostattempt.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',              component: LoginComponent },
  { path: 'instructor',         loadChildren: 'app/instructor/instructor.module#InstructorModule' },
  { path: 'question',           loadChildren: 'app/question/question.module#QuestionModule' },
  { path: 'studentclasses',     component: StudentClassComponent },
  { path: 'student',            component: StudentComponent },
  { path: 'createtest',         component: CreateTestComponent },
  { path: 'attemptscore/:id',   component: AttemptScoreComponent },
  { path: 'choosetesttemplate', loadChildren: 'app/choosetesttemplate/choosetesttemplate.module#ChooseTestTemplateModule' },
  { path: 'studentreview' ,     component: StudentReviewComponent}, 
  { path: 'studentlogin' ,      component: StudentLoginComponent}, 
  { path: 'studentpostattempt', component: StudentPostAttemptComponent},
  //{ path: 'attempt',            component: AttemptComponent}
  { path: 'attempt',           loadChildren: 'app/attempt/attempt.module#AttemptModule' }// attempt.module#AttemptModule' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
