// When creating a new component, always first import Component:
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { TestTemplate }           from '../testtemplate/testtemplate';
import { TestTemplateService }    from '../testtemplate/testtemplate.service';


@Component({
  selector:     'my-pre-attempt',
  templateUrl:  'pre-attempt.component.html',
  providers:    [ TestTemplateService ]
})
export class PreAttemptComponent implements OnInit {
  testtemplate: TestTemplate;

  constructor(private route: ActivatedRoute, private testTemplateService: TestTemplateService) {

  }

  ngOnInit() {
    let id = +this.route.snapshot.params['testTemplateID'];
    this.testTemplateService.getTestTemplateMetaById(id).subscribe(tt => this.testtemplate = tt)
  }

  startAttempt() {
    console.log('in PreAttemptComponent.startAttempt() with id=' + this.testtemplate.id);

  }

}