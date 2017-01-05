/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 10 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
//import { Router, ActivatedRoute, Params } from '@angular/router';

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
  possibleAnswers: string[] = [ "" ];
  correctAnswers: AnswerList;
  list = { "exam":EnumExams[0], "language":EnumLanguages[0], "enabled": true}

  constructor(
        private route: ActivatedRoute,
        private questionService  : QuestionService,
        private answerListService: AnswerListService, 
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
    this.getQuestion(id);
    // alternative, takes ACTUAL value of routeParams (not tested):
    // this.route.params.switchMap((params: Params) => this.getQuestion(+params['id']));
    
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
    if (id == -1) {
        this.question = new Question();
        //put forexam init (and others?) here
        this.question.id = -1;
        this.question.name = "";
        this.question.forExam = 0;
        this.question.programmingLanguage = 0;
        this.correctAnswers = this.resetCorrectAnswers();
        this.resetPossibleAnswers();
        console.log("----NEW QUESTION CREATED");
    } else {
        this.questionService.getQuestion(id).subscribe(question => {
          this.question = question;
          if (this.question.possibleAnswers != undefined) {
            this.possibleAnswers = this.question.possibleAnswers;
            this.correctAnswers  = this.question.correctAnswers; 
          } else {
            this.resetPossibleAnswers();
          }
        });
    }
  }  
    //this seems odd...
    // this.questionService.getQuestion(id).subscribe(question => {
    //   if (question.id == -1) {
    //     console.log("----NEW QUESTION CREATED");
    //     this.question = new Question();
    //     this.correctAnswers = this.resetCorrectAnswers();
    //     this.resetPossibleAnswers();
    //   } else {
    //     this.question = question;
    //     if (this.question.possibleAnswers != undefined) {
    //       this.possibleAnswers = this.question.possibleAnswers;
    //       this.correctAnswers  = this.question.correctAnswers; 
    //     } else {
    //       this.resetPossibleAnswers();
    //     }
    //   }
    // });
  

  addAnswer() {
    this.possibleAnswers.push("");
  }

  removeAnswer(index) {
    // Remove element on given index from array
    this.correctAnswers.answers.splice(index, 1);
    // Append new 'false' element at the end to get 10 elements again
    this.correctAnswers.answers.push(false);
    this.question.correctAnswers = this.correctAnswers;

    // Remove element on given index from array
    this.possibleAnswers.splice(index,1);
    this.question.possibleAnswers = this.possibleAnswers; 
  }

  // updateLanguage($event)    { this.question.programmingLanguage  = $event.target.value; }
  // updateExam($event)        { this.question.forExam              = $event.target.value; }
  updateName($event)        { this.question.name                 = $event.target.value; }
  updateType($event)        { this.question.typeOfQuestion       = $event.target.value; }
  updateExplanation($event) { this.question.explanationAnswer    = $event.target.value; }
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
      //will return id==-1 if post failed  
      if (answerListId > 0) {
        this.questionService.postQuestion(qstn, answerListId).subscribe(question => {
          //return value check?
          console.log("POST SUCCEEDED");
          //save success confirmation for user?
        });
      }
    });
  }

 toCharLetter(number: Number){
    var char = String.fromCharCode(number.valueOf() + 64);
    return char;
  }

  updateLanguage($event)    { 
    this.list.language  = EnumLanguages[parseInt($event.target.value)];
    this.questionService.getLevels(this.list.language).subscribe(levels => {
      console.log(levels);
      this.exams.length = 1;
      for(let i=0 ; i<levels.length ; i++) {
        this.exams.push( { "id": i+1, "name":levels[i] } );
      }
    })
    this.list.exam = this.exams[0].name;
  //  this.getQuestionList(); 
  }

  updateExam($event)        { this.list.exam      = EnumExams[parseInt($event.target.value)];   //  this.getQuestionList();
     }

}