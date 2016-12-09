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

@Component({
  selector: 'my-show-question',
  templateUrl: 'show-question.component.html',
  styleUrls: [ 'show-question.component.css' ],
  providers: [ QuestionService, AnswerListService ]
})
export class ShowQuestionComponent implements OnInit {
  question: Question;
  possibleAnswers: string[] = [ "" ];
  correctAnswers: AnswerList;
  givenAnswers: AnswerList;

  constructor(
        private questionService  : QuestionService,
        private answerListService: AnswerListService, 
        private globalService    : GlobalService) {
    this.correctAnswers = this.resetCorrectAnswers();
    this.givenAnswers = this.resetGivenAnswers();
    
  }

  ngOnInit() {
    this.getQuestion(1);
  }

  resetCorrectAnswers(): AnswerList {
    let correctAnswers = new AnswerList();
    correctAnswers.id = -1;
    correctAnswers.answers = [ false, false, false, false, false, false, false, false, false, false ];
    return correctAnswers;
  }

  resetGivenAnswers(): AnswerList {
    let givenAnswers = new AnswerList();
    givenAnswers.id = -1;
    givenAnswers.answers = [ false, false, false, false, false, false, false, false, false, false ];
    return givenAnswers;
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

  //updateLanguage($event)    { this.question.programmingLanguage  = $event.target.value; }
  //updateExam($event)        { this.question.forExam              = $event.target.value; }
  updateName($event)        { this.question.name                 = $event.target.value; }
  updateType($event)        { this.question.typeOfQuestion       = $event.target.value; }
  //updateExplanation($event) { this.question.explanationAnswer    = $event.target.value; }
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
  
  saveGivenAnswers() {
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