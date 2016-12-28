// When creating a new component, always first import Component:
import { Component, OnInit }              from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Http, Response, Headers }        from '@angular/http';

import { Observable }                     from 'rxjs/Observable';

import { TestTemplate }                   from '../testtemplate/testtemplate';
import { TestTemplateService }            from '../testtemplate/testtemplate.service';
import { GlobalService }                  from '../global.service';
import { AttemptService }                 from '../attempt/attempt.service';
import { Question }                       from '../question/question';


@Component({
  selector:     'my-pre-attempt',
  templateUrl:  'pre-attempt.component.html',
  providers:    [ TestTemplateService, AttemptService ]
})
export class PreAttemptComponent implements OnInit {
	private headers = new Headers({ 'Content-Type': 'application/json' });
  private testtemplate: TestTemplate;
  private currentUrl: string;
  //private attemptID: number;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private testTemplateService: TestTemplateService,
    private attemptService: AttemptService,
    private globalService: GlobalService,
    private http: Http) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.params['testTemplateID'];
    //console.log(this.route.snapshot.params);
    // console.log("In PreAttemptComponent.ngOnInit with testTemplateID = " + id);
    this.testTemplateService.getTestTemplateMetaById(id).subscribe(tt => this.testtemplate = tt);
  }

  // WORK IN PROGRESS
  startAttempt(testTemplateId: number) {
    this.attemptService.postNewAttempt(testTemplateId, this.globalService.getStudentID()).subscribe(attemptID => { 
      this.globalService.setAttemptID(attemptID);
      // console.log("In PreAttemptComponent.startAttempt with globalService.attemptID=" + this.globalService.getAttemptID());
      // Get the question on position 1 in the list and include its Id in the navigater call.
      this.attemptService.getQuestion(attemptID, 1).subscribe(q => {
        console.log("In PreAttemptComponent.startAttempt with q.id = " + q.id);
        this.router.navigate(['question/show/', q.id.toString()]);
      });
    }); 
  }
}