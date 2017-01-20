/**
 * @Author: Dave Schellekens
 * date: 01-01-2017
 * 
 * Displays a single question out of an attempt and lets student choose answer. answer gets saved
 * when clicking prev/next/review.
 * 
 */

import { Component, OnInit }            from '@angular/core'; // Removed Directive
import { Router }                       from '@angular/router';

import { Observable }                   from 'rxjs/Observable';

import { GlobalService }                from '../global.service';
import { AttemptService }               from '../attempt/attempt.service';
import { Question }                     from '../question/question';
import { QuestionDisplayComponent }     from '../question/question-display.component';

import { AnswerList }                   from '../answerlist/answerlist';
//import { TestTemplateService }          from '../testtemplate/testtemplate.service';
//import { QuestionModule }           from '../question/question.module';
//import { QuestionService }              from '../question/question.service';


@Component({
  selector: 'attempt-selector',
  templateUrl: 'attempt.component.html',
  styleUrls: ['attempt.component.css'],
  providers: [ AttemptService ]
  
})
export class AttemptComponent implements OnInit {   
    question: Question;
    currentAttemptID: number;       //id of attempt currently in progress
    //currentTestTemplate: TestTemplate;    //testtemplate currentAttempt is based on
    currentQuestionNR: number;      //question nr. (index [1, ...]) to display
    currentQuestionAmount: number;  //amount of questions in this test
    givenAnswer: AnswerList;

    constructor (
        //private testTemplateService: TestTemplateService,
        private attemptService: AttemptService,
        private globalService: GlobalService,
        private router: Router) {}

    ngOnInit(){
        this.currentAttemptID = this.globalService.getCurrentAttemptID();
        //this.attemptService.getTesttemplate(this.currentAttemptID).subscribe(tt =>{
        //    this.currentTestTemplate = tt;
        //}) ;
        this.currentQuestionAmount = this.globalService.getCurrentQuestionAmount();
        this.currentQuestionNR = this.globalService.getCurrentQuestionNr();
            
        this.resetGivenAnswer();
        this.getQuestion(this.currentAttemptID, this.currentQuestionNR );
    }

    getQuestion(attemptID, questNR){
      this.attemptService.getQuestion(attemptID, questNR).subscribe(question => {
        //console.log("In AttemptComponent.getQuestion with q.id = " + q.id);
        this.question = question;
      });
      //always retrieve answer, does not matter if question still unanswered (all false)
      this.givenAnswer = null;      //let's try this to only show possibleanswers when done retrieving givenansw.
      this.attemptService.getGivenAnswer(attemptID, questNR).subscribe(al => {
        this.givenAnswer = al;
        console.log("attempt.getQuestion retrieved Answerlist: " + this.givenAnswer.answers);
      })  
    }

    // getQuestion(id: number) {
    //   this.question = null;
    //   this.questionService.getQuestionExam(id).subscribe(question => {
    //     if (question.id == -1) {
    //       console.log("----NO QUESTION AVAILABLE");
    //       this.question = new Question();
    //       this.givenAnswers = this.resetGivenAnswers();
    //       this.resetPossibleAnswers();
    //     } else {
    //       this.question = question;
    //       if (this.question.possibleAnswers != undefined) {
    //         this.possibleAnswers = this.question.possibleAnswers;
    //         this.givenAnswers  = this.resetGivenAnswers(); 
    //       } else {
    //         this.resetPossibleAnswers();
    //       }
    //     }
    //   });
    // }

    resetGivenAnswer(){
        this.givenAnswer = { "id" : 0, "answers" : [false, false, false, false, false, false, false, false, false, false]};
    }
    
    updateGivenAnswer(id: number, $event) {
        console.log("now in updategivenanswer");
        this.givenAnswer.answers[id] = $event.target.checked;
    }

    saveAnswer(){
        console.log("saveAnswer. attemptID: " + this.currentAttemptID + ", questnNR: " + this.currentQuestionNR + ", answers: " + this.givenAnswer.answers);
        this.attemptService.putGivenAnswer(this.currentAttemptID, this.currentQuestionNR, this.givenAnswer).subscribe(res =>{
            console.log("saveAnswer result: " + JSON.stringify(res));
            //this.givenAnswer = null;    //nope...async...timing unpredictable... 
            //TODO response handling
        });
        //save remainingtime?
        //what if response != OK?
    }

    saveAnswerAndNavigateToPostAttempt() {
        console.log("saveAnswer. attemptID: " + this.currentAttemptID + ", questnNR: " + this.currentQuestionNR + ", answers: " + this.givenAnswer.answers);
        this.attemptService.putGivenAnswer(this.currentAttemptID, this.currentQuestionNR, this.givenAnswer).subscribe(res =>{
            console.log("saveAnswer result: " + JSON.stringify(res));
            this.resetGivenAnswer();
            this.router.navigate(['studentpostattempt']);
            //this.givenAnswer = null;    //nope...async...timing unpredictable... 
            //TODO response handling
        });
        //save remainingtime?
        //what if response != OK?
    }

    markQuestion(){
        //TODO later...
    }

    goPrevQuestion(){
        this.saveAnswer();
        this.resetGivenAnswer();
        //will not go past first (nr. 1) question.
        this.globalService.setCurrentQuestionNr(this.globalService.getCurrentQuestionNr() - 1 );
        this.currentQuestionNR = this.globalService.getCurrentQuestionNr();
        this.getQuestion(this.currentAttemptID, this.currentQuestionNR);
    }

    goNextQuestion(){
        if (this.currentQuestionNR < this.currentQuestionAmount){
            this.saveAnswer();
            this.resetGivenAnswer();
            this.globalService.setCurrentQuestionNr(this.globalService.getCurrentQuestionNr() + 1 );
            this.currentQuestionNR = this.globalService.getCurrentQuestionNr();
            this.getQuestion(this.currentAttemptID, this.currentQuestionNR);
        } else {
            this.goPostExam();
        }
    }

    goPostExam(){
        // TO DO: Wait for result of saveAnswer before navigating to studentpostattempt.
        //   If we don't wait, the given answer of the lastly visited question has not been saved before
        //   reading the answers back from the database.
        this.saveAnswerAndNavigateToPostAttempt();
        //this.saveAnswer();
        //this.resetGivenAnswer();
        //this.router.navigate(['studentpostattempt']);
    }

    toCharLetter(number: Number){
        var char = String.fromCharCode(number.valueOf() + 64);
        return char;
    }

}