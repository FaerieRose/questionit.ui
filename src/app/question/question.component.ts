/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 10 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit }  from '@angular/core';

import { Question }                 from './question';
import { QuestionService }          from './question.service';
import { QuestionDisplayComponent } from './question-display.component';

import { EnumLanguages }   from '../enums'; 
import { EnumExams }       from '../enums'; 

@Component({
  selector: 'my-question',
  templateUrl: 'question.component.html',
  styleUrls: [ 'question.component.css' ],
  providers: [ QuestionService ]
})
export class QuestionComponent implements OnInit {
  questions: Question[];
  question: Question;
  languages = [];
  exams = [];


  constructor(private questionService: QuestionService) {
    let lang = EnumLanguages;
    let i = 0;
    while (lang[i] != null) {
      let language = { id: i, name: lang[i] };
      this.languages.push(language);
      i++;
    }
    let exams = EnumExams;
    i = 0;
    while (exams[i] != null) {
      let exam = { id: i, name: exams[i] };
      this.exams.push(exam);
      i++;
    }
  }

  ngOnInit() {
    this.questionService.getQuestions().subscribe(questions => {
      this.questions = questions;
    });
    this.questionService.getQuestion(1).subscribe(question => {
      this.question = question;
    });
  }

  changeId($event) {
    let id = $event.target.value;
    let pQuestion = 
    this.questionService.getQuestion(id).subscribe(question => {
      this.question = question;
    });
  }

  updateLanguage($event) {
    console.log($event.target.value);
  }
  
  updateExam($event) {
    console.log($event.target.value);
  }

}