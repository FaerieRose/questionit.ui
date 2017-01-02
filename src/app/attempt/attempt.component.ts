/**
 * @Author: Dave Schellekens
 * date: 01-01-2017
 * 
 * Displays a single question out of an attempt and lets student choose answer. answer gets saved
 * when clicking prev/next/review.
 * 
 */

import { Component, Directive, OnInit } from '@angular/core';
import { Router }                       from '@angular/router';

import { GlobalService }                from '../global.service';
import { TestTemplateService }          from '../testtemplate/testtemplate.service';
import { AttemptService }               from '../attempt/attempt.service';
//import { QuestionModule }           from '../question/question.module';
import { Question }                     from '../question/question';
import { QuestionService }              from '../question/question.service';
//import { QuestionDisplayComponent }  from '../question/question-display.component';
import { AnswerList }                   from '../answerlist/answerlist';


@Component({
  selector: 'attempt-selector',
  templateUrl: 'attempt.component.html',
  providers: [TestTemplateService, AttemptService]
  
})
export class AttemptComponent implements OnInit {   

currentAttemptID: number;       //id of attempt currently in progress
//currentTestTemplate: TestTemplate;    //testtemplate currentAttempt is based on
currentQuestionNR: number;      //question nr. (index [1, ...]) to display
currentQuestionAmount: number;  //amount of questions in this test
question: Question;
givenAnswer: AnswerList;

constructor(
    private testTemplateService: TestTemplateService,
    private attemptService: AttemptService,
    private globalService: GlobalService,
    private router: Router
    ) {
  }

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

    getQuestion(attmptID, questNR){
      
      this.attemptService.getQuestion(attmptID, questNR).subscribe(q => {
        //console.log("In AttemptComponent.getQuestion with q.id = " + q.id);
        this.question = q;
        });
      //always retrieve answer, does not matter if question still unanswered (all false)
      this.givenAnswer = null;      //let's try this to only show possibleanswers when done retrieving givenansw.
      this.attemptService.getGivenAnswer(attmptID, questNR).subscribe(al =>{
          this.givenAnswer = al;
          console.log("attempt.getQuestion retrieved Answerlist: " + this.givenAnswer.answers);
      })  
    }

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
        this.saveAnswer();
        this.resetGivenAnswer();
        this.router.navigate(['studentpostattempt']);
    }


    toCharLetter(number: Number){
        var char = String.fromCharCode(number.valueOf() + 64);
        return char;
    }

}