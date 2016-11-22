/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 10 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit }  from '@angular/core';

import { Question }                 from './question';
import { QuestionService }          from './question.service';
import { QuestionDisplayComponent } from './question-display.component';

import { GlobalService }            from '../global.service';
import { AnswerList }               from '../answerlist/answerlist';
import { AnswerListService }        from '../answerlist/answerlist.service';

import { EnumLanguages }   from '../enums'; 
import { EnumExams }       from '../enums'; 

@Component({
  selector: 'my-question',
  templateUrl: 'question.component.html',
  styleUrls: [ 'question.component.css' ],
  providers: [ QuestionService, AnswerListService ]
})
export class QuestionComponent implements OnInit {
  question: Question;
  languages = [];
  exams = [];
  instructor: number;
  possibleAnswers: string[] = [ "" ];
  correctAnswers: AnswerList;

  constructor(
        private questionService  : QuestionService,
        private answerListService: AnswerListService, 
        private globalService    : GlobalService) {
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
    this.correctAnswers = this.resetCorrectAnswers();
  }

  ngOnInit() {
    this.getQuestion(1);
    this.instructor = this.globalService.getInstructorID();
  }

  resetCorrectAnswers(): AnswerList {
    let correctAnswers = new AnswerList();
    correctAnswers.id = -1;
    correctAnswers.answers = [ false, false, false, false, false, false, false, false, false, false ];
    return correctAnswers;
  }

  resetPossibleAnswers() {
    while (this.possibleAnswers.length > 0) {
      this.possibleAnswers.pop();
    }
    this.possibleAnswers.push("");
  }

  changeId($event) {
    let id = $event.target.value;
    this.getQuestion(id);
  }

  getQuestion(id: number) {
    this.question = null;
    this.questionService.getQuestion(id).subscribe(question => {
      if (question.id == -1) {
        console.log("----NEW QUESTION CREATED");
        this.question = new Question();
        this.correctAnswers = this.resetCorrectAnswers();
        this.resetPossibleAnswers();
      } else {
        this.question = question;
        if (this.question.possibleAnswers != undefined) {
          this.possibleAnswers = this.question.possibleAnswers;
          this.correctAnswers  = this.question.correctAnswers; 
        } else {
          this.resetPossibleAnswers();
        }
      }
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
  updateAnswer(id: number, $event) {
    this.possibleAnswers[id] =  $event.target.value;
    this.question.possibleAnswers = this.possibleAnswers; 
  }
  updateCorrectAnswer(id: number, $event) {
    this.correctAnswers.answers[id] = $event.target.checked;
    this.question.correctAnswers = this.correctAnswers;
  }


  saveQuestion() {
    let qstn = this.question;
    this.answerListService.postAnswerList(this.correctAnswers).subscribe(answerListId => {
      if (answerListId > 0) {
        this.questionService.postNewQuestion(qstn, answerListId).subscribe(question => {
          console.log("POST SUCCEEDED");
        });
      }
    });
  }
}