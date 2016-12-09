/* ----------------------------------------------------------------------------------- */
/* Author       : Dave Schellekens                                                     */
/* Date created : 09 Dec 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit }  from '@angular/core';
//import { ActivatedRoute, Params } from '@angular/router';
//import { Router, ActivatedRoute, Params } from '@angular/router';

import { Attempt }                 from './attempt';
//import { QuestionService }          from './question.service';
//import { QuestionDisplayComponent } from './question-display.component';

//import { GlobalService }            from '../global.service';
//import { AnswerList }               from '../answerlist/answerlist';
//import { AnswerListService }        from '../answerlist/answerlist.service';

//import { EnumLanguages }   from '../enums'; 
//import { EnumExams }       from '../enums'; 

@Component({
  selector: 'my-question',
  templateUrl: 'attemptscore.component.html',
  //styleUrls: [ 'attemptscore.component.css' ],
  providers: [ /*QuestionService, AnswerListService*/ ]
})
export class AttemptScoreComponent implements OnInit {
//   question: Question;
//   languages = [];
//   exams = [];
attempt: Attempt;
//   possibleAnswers: string[] = [ "" ];
//   correctAnswers: AnswerList;

  constructor(
        private route: ActivatedRoute,
        // private questionService  : QuestionService,
        // private answerListService: AnswerListService, 
        private globalService    : GlobalService) {
    this.languages = this.globalService.getLanguages();
    this.exams = this.globalService.getExams();
    this.correctAnswers = this.resetCorrectAnswers();
  }

  ngOnInit() {
    //get question id from routeParams
    //Takes INITIAL value of routeParams. Works only if there is no direct routing from one question to another
    let id = +this.route.snapshot.params['id'];
    console.log(id);
    this.getAttempt(id);
    // alternative, takes ACTUAL value of routeParams (not tested):
    // this.route.params.switchMap((params: Params) => this.getQuestion(+params['id']));
    
  }


  getAttempt(id) {



  }

