/* ----------------------------------------------------------------------------------- */
/* Author       : Bas Smulders                                                         */
/* Date created : 9 Dec 2016                                                           */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';

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
  // Temporarily:
  index: number; // Used to set/get the index of the current question in the current test template.
  size: number; // Used to set the size of the current question list. This is a temporary solution. 
  // Both index and size must actually be managed by the attempt.component which is created by Dave.

  constructor(
        private route            : ActivatedRoute, 
        private router           : Router,
        private questionService  : QuestionService,
        private answerListService: AnswerListService, 
        private globalService    : GlobalService) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    // console.log("In ShowQuestionComponent.ngOnInit with id = " + id)
    //this.getQuestion(params['id']);
    this.getQuestion(id);
    this.size = 10;
    this.index = 1;
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

  //updateName($event)        { this.question.name                 = $event.target.value; }
  //updateType($event)        { this.question.typeOfQuestion       = $event.target.value; }
  //updateQuestion($event)    { this.question.question             = $event.target.value; }
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

  // To be reworked:
  gotoPreviousQuestion() {
    // this.getQuestion(this.question.id - 1);
    if (this.index > 1) {
      this.getQuestion(--this.index);
    }
  }

  // To be reworked:
  gotoNextQuestion() {
    // this.getQuestion(this.question.id + 1);
    if (this.index < this.size) {
      this.getQuestion(++this.index);
    }
  }

  toCharLetter(number: Number){
    var char = String.fromCharCode(number.valueOf() + 64);
    return char;
  }

  // To be reworked:
  gotoPostExam() {
    this.router.navigate(['studentpostattempt']);
  }

  // getIndex(): number {
  //   return this.index;
  // }

  // setIndex(index: number) {
  //   this.index = index;
  // }

}