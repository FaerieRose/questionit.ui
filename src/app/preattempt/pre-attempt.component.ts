/**
 * author: ?
 * 
 * 30-12-2016: changes Dave
 * 
 * 
 * 
 * 
 */


// When creating a new component, always first import Component:
import { Component, OnInit }              from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Http, Response, Headers }        from '@angular/http';

import { Observable }                     from 'rxjs/Observable';

import { TestTemplate }                   from '../testtemplate/testtemplate';
import { TestTemplateModelBasic }         from '../testtemplate/testtemplatemodelbasic';
import { TestTemplateService }            from '../testtemplate/testtemplate.service';
import { GlobalService }                  from '../global.service';
import { AttemptService }                 from '../attempt/attempt.service';
//import { Question }                       from '../question/question';

@Component({
  selector:     'my-pre-attempt',
  templateUrl:  'pre-attempt.component.html',
  styleUrls:    ['pre-attempt.component.css'],
  providers:    [ TestTemplateService, AttemptService ]
})
export class PreAttemptComponent implements OnInit {
	private headers = new Headers({ 'Content-Type': 'application/json' });
  private testtemplateMB: TestTemplateModelBasic;
  private currentUrl: string;
  //private attemptID: number;
  private testTemplateID: number;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private testTemplateService: TestTemplateService,
    private attemptService: AttemptService,
    private globalService: GlobalService,
    private http: Http) {
  }

  ngOnInit() {
    this.testTemplateID = +this.route.snapshot.params['testTemplateID'];
    //console.log(this.route.snapshot.params);
    // console.log("In PreAttemptComponent.ngOnInit with testTemplateID = " + id);
    this.testTemplateService.getTestTemplateMetaById(this.testTemplateID).subscribe(tt => this.testtemplateMB = tt);
  }

  // WORK IN PROGRESS
  startNewAttempt(testTemplateId: number) {
    
    this.attemptService.postNewAttempt(testTemplateId, this.globalService.getStudentID()).subscribe(attemptID => { 
      this.globalService.setCurrentAttemptID(attemptID);
      this.globalService.setCurrentQuestionAmount(this.testtemplateMB.size);
      this.globalService.setCurrentQuestionNr(1);
      console.log("In PreAttemptComponent.startAttempt with globalService.attemptID=" + this.globalService.getCurrentAttemptID());
      this.router.navigate(['attempt']);
      // Get the question on position 1 in the list and include its Id in the navigater call.
      //this.attemptService.getQuestion(attemptID, 1).subscribe(q => {
        //console.log("In PreAttemptComponent.startAttempt with q.id = " + q.id);
        //this.router.navigate(['question/show/', q.id.toString()]);
      //});
    }); 
  }
}