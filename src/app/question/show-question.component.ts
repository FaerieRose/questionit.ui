/* ----------------------------------------------------------------------------------- */
/* Author       : Bas Smulders                                                         */
/* Date created : 9 Dec 2016                                                           */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

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
  givenAnswers: AnswerList;

  constructor(
        private route            : ActivatedRoute, 
        private questionService  : QuestionService,
        private answerListService: AnswerListService, 
        private globalService    : GlobalService) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    // console.log("In ShowQuestionComponent.ngOnInit with id = " + id)
    //this.getQuestion(params['id']);
    this.getQuestion(id);
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
    this.questionService.getQuestionExam(id).subscribe(question => {
      if (question.id == -1) {
        console.log("----NO QUESTION AVAILABLE");
        this.question = new Question();
        this.givenAnswers = this.resetGivenAnswers();
        this.resetPossibleAnswers();
      } else {
        this.question = question;
        if (this.question.possibleAnswers != undefined) {
          this.possibleAnswers = this.question.possibleAnswers;
          this.givenAnswers  = this.resetGivenAnswers(); 
        } else {
          this.resetPossibleAnswers();
        }
      }
    });
  }

  addAnswer() {
    this.possibleAnswers.push("");
  }

  updateName($event)        { this.question.name                 = $event.target.value; }
  updateType($event)        { this.question.typeOfQuestion       = $event.target.value; }
  updateQuestion($event)    { this.question.question             = $event.target.value; }
  updateAnswer(id: number, $event) {
    this.possibleAnswers[id] =  $event.target.value;
    this.question.possibleAnswers = this.possibleAnswers; 
  }
  
  // saveGivenAnswers() {
  //   let qstn = this.question;
  //   this.answerListService.postAnswerList(this.correctAnswers).subscribe(answerListId => {
  //     if (answerListId > 0) {
  //       this.questionService.postNewQuestion(qstn, answerListId).subscribe(question => {
  //         console.log("POST SUCCEEDED");
  //       });
  //     }
  //   });
  // }

  gotoPreviousQuestion() {
    this.getQuestion(this.question.id - 1);
  }

  gotoNextQuestion() {
    this.getQuestion(this.question.id + 1);
  }

 toCharLetter(number: Number){
    var char = String.fromCharCode(number.valueOf() + 64);
    return char;
  }

}