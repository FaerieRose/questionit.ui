/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 10 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */

import { BrowserModule }   from '@angular/platform-browser';
import { NgModule }        from '@angular/core';
import { FormsModule }     from '@angular/forms';
import { HttpModule }      from '@angular/http';

import { AppRoutingModule }     from './app-routing.module';
import { AppComponent }         from './app.component';
import { QuestionComponent }    from './question/question.component';
import { QuestionsComponent }   from './question/questions.component';
import { QuestionDisplayComponent } from './question/question-display.component';
import { InstructorComponent } from './instructor/instructor.component';
import { InstructorsComponent } from './instructor/instructors.component';
import { StudentClassComponent } from './studentclasses/studentclass.component';
import { BindInstructorToClassComponent } from './instructor/bindinstructortoclass.component';
import { StudentComponent } from './student/student.component';
import { GlobalService }     from './global.service';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionsComponent,
    QuestionDisplayComponent,
    BindInstructorToClassComponent,
    InstructorComponent,
    InstructorsComponent,
    StudentClassComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
