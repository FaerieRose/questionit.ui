import { Component, Directive, OnInit }        from '@angular/core';

import { GlobalService }            from '../global.service';
import { TestTemplateService }      from '../testtemplate/testtemplate.service';
import { AttemptService }           from '../attempt/attempt.service';
import { ShowQuestionComponent }    from '../question/show-question.component';




@Component({
  selector: 'attempt-selector',
  template: 'attempt.component.html'
  
})
export class AttemptComponent implements OnInit {   

trala: String;
currentAttemptID: number;

constructor(
    private testTemplateService: TestTemplateService,
    private attemptService: AttemptService,
    private globalService: GlobalService,
    ) {
  }

    ngOnInit(){
        this.currentAttemptID = this.globalService.getCurrentAttemptID();
        this.attemptService.postNewAttempt(testTemplateId, this.globalService.getStudentID()).subscribe(attemptID => { 
      //this.globalService.setAttemptID(attemptID);
      // console.log("In PreAttemptComponent.startAttempt with globalService.attemptID=" + this.globalService.getAttemptID());
      // Get the question on position 1 in the list and include its Id in the navigater call.
      //this.attemptService.getQuestion(attemptID, 1).subscribe(q => {
        //console.log("In PreAttemptComponent.startAttempt with q.id = " + q.id);
        //this.router.navigate(['question/show/', q.id.toString()]);
      //});
    //}); 
    }

    updatetrala($event){
        this.trala = "dffdfs";
    }



}