import { Component, Directive, OnInit }        from '@angular/core';

import { GlobalService }            from '../global.service';
import { TestTemplateService }      from '../testtemplate/testtemplate.service';
import { AttemptService }           from '../attempt/attempt.service';
//import { QuestionModule }           from '../question/question.module';
import { Question }                 from '../question/question';
import { QuestionService }          from '../question/question.service';
//import { QuestionDisplayComponent } from '../question/question-display.component';



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
     
    }

    updatetrala($event){
        this.trala = "dffdfs";
    }

    getQuestion(attmptID, questNR){
      this.attemptService.getQuestion(attmptID, questNR).subscribe(q => {
        console.log("In AttemptComponent.getQuestion with q.id = " + q.id);
        this.question = q;
        });
    }

}