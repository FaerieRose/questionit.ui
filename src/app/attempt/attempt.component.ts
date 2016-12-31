import { Component, Directive, OnInit }        from '@angular/core';

import { GlobalService }            from '../global.service';
import { TestTemplateService }      from '../testtemplate/testtemplate.service';
import { AttemptService }           from '../attempt/attempt.service';
//import { QuestionModule }           from '../question/question.module';
import { Question }                 from '../question/question';
import { QuestionService }          from '../question/question.service';
//import { QuestionDisplayComponent } from '../question/question-display.component';
import { AnswerList }               from '../answerlist/answerlist';


@Component({
  selector: 'attempt-selector',
  templateUrl: 'attempt.component.html',
  providers: [TestTemplateService, AttemptService]
  
})
export class AttemptComponent implements OnInit {   

trala: String;
currentAttemptID: number;       //id of attempt currently in progress
currentQuestionNR: number;      //question nr. (index [1, ...]) to display
question: Question;
givenAnswer: AnswerList;

constructor(
    private testTemplateService: TestTemplateService,
    private attemptService: AttemptService,
    private globalService: GlobalService,
    ) {
  }

    ngOnInit(){
        this.currentAttemptID = this.globalService.getCurrentAttemptID();
        this.currentQuestionNR = this.globalService.getCurrentQuestionIndex();
       
        this.getQuestion(this.currentAttemptID, this.currentQuestionNR );
        this.givenAnswer = { "id" : 0, "answers" : [false, false, false, false, false, false, false, false, false, false]}
    }

    getQuestion(attmptID, questNR){
      this.attemptService.getQuestion(attmptID, questNR).subscribe(q => {
        console.log("In AttemptComponent.getQuestion with q.id = " + q.id);
        this.question = q;
        });
    }

    updateGivenAnswer(id: number, $event) {
        this.givenAnswer.answers[id] = $event.target.checked;
    
    }

    saveAnswer(){
        this.attemptService.putGivenAnswer(this.currentAttemptID, this.currentQuestionNR, this.givenAnswer).subscribe(res =>{
            console.log(res.toString);
        });
        //save remainingtime?
        
    }

    markQuestion(){
        //later...
    }

    goPrevQuestion(){
        this.saveAnswer();
        this.trala = "dffdfs";
    }

    goNextQuestion(){
        this.saveAnswer();
        this.trala = "dffdfs";
    }

    goPostExam(){
        this.saveAnswer();
        this.trala = "dffdfs";
    }


    toCharLetter(number: Number){
        var char = String.fromCharCode(number.valueOf() + 64);
        return char;
    }

}