/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 10 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit }  from '@angular/core';

import { GlobalService }            from '../global.service';
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
  instructor: number;
  possibleAnswers: string[];

  constructor(private questionService: QuestionService, private globalService: GlobalService) {
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
    this.getQuestion(1);
    this.instructor = this.globalService.getInstructorID();
  }

  changeId($event) {
    let id = $event.target.value;
    this.getQuestion(id);
  }

  getQuestion(id: number) {
    this.questionService.getQuestion(id).subscribe(question => {
      this.question = question;
      this.possibleAnswers = this.question.possibleAnswers;
      console.log(this.question.correctAnswers);
    });
  }

  addAnswer() {
    this.possibleAnswers.push("");
  }

  updateLanguage($event)    { this.question.programmingLanguage  = $event.target.value; }
  updateExam($event)        { this.question.forExam              = $event.target.value; }
  updateName($event)        { this.question.name                 = $event.target.value; }
  updateType($event)        { this.question.typeOfQuestion       = $event.target.value; }
  updateExplanation($event) { this.question.explantionAnswer     = $event.target.value; }
  updateQuestion($event)    { this.question.question             = $event.target.value; }

  saveQuestion() {
    this.questionService.postNewQuestion(this.question).subscribe(question => {
      console.log("POST SUCCEEDED");
    });
  }
}