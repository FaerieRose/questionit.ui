import { BrowserModule }   from '@angular/platform-browser';
import { NgModule }        from '@angular/core';
import { FormsModule }     from '@angular/forms';
import { HttpModule }      from '@angular/http';

import { AppRoutingModule }  from './app-routing.module';
import { AppComponent }      from './app.component';
import { QuestionComponent } from './question/question.component';
import { QuestionDisplayComponent } from './question/question-display.component';
import { GlobalService }     from './global.service';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionDisplayComponent
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
