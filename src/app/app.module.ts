/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 10 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */

import { BrowserModule }   from '@angular/platform-browser';
import { NgModule }        from '@angular/core';
import { FormsModule }     from '@angular/forms';
import { HttpModule }      from '@angular/http';

import { AppRoutingModule }         from './app-routing.module';
import { AppComponent }             from './app.component';
import { StudentClassComponent }    from './studentclasses/studentclass.component';
import { StudentComponent }         from './student/student.component';
import { AttemptScoreComponent }    from './attempt/attemptscore.component';
import { CreateTestComponent }      from './createtest/createtest.component';
import { GlobalService }            from './global.service';

@NgModule({
  declarations: [
    AppComponent,
    StudentClassComponent,
    StudentComponent,
    AttemptScoreComponent,
    CreateTestComponent
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
