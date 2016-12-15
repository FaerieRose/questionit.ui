/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 23 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit }     from '@angular/core';
import { Router }                from '@angular/router';

import { GlobalService }         from '../global.service';
import { TestTemplate }          from '../testtemplate/testtemplate';
import { TestTemplateService }   from '../testtemplate/testtemplate.service';

import { EnumLanguages }         from '../enums'; 
import { EnumExams }             from '../enums'; 

@Component({
  selector: 'my-testtemplates',
  templateUrl: './choosetesttemplate.component.html',
  styleUrls: [ './choosetesttemplate.component.css' ],
  providers: [ TestTemplateService ]
})
export class ChooseTestTemplateComponent implements OnInit {
  languages = [];
  //exams = [];
  testTemplateList: TestTemplate[];
  //list = { "exam":EnumExams[0], "language":EnumLanguages[0], "enabled": true, "obsolete":false }

  constructor(
        private testTemplateService  : TestTemplateService,
        private globalService    : GlobalService,
        private router: Router) { 
    this.languages = this.globalService.getLanguages();
    //this.exams.push( { "id": 0, "name":"NONE" } );
  }

  ngOnInit() {
    this.getTestTemplateListMeta();
  }

  getTestTemplateListMeta() {
    this.testTemplateService.getTestTemplatesMeta().subscribe(testTemplates => { //this.list.exam, this.list.language, this.list.enabled, this.list.obsolete).subscribe(questions => {
      this.testTemplateList = testTemplates;
      console.log(this.testTemplateList.length);
    }); 
  }

  // updateLanguage($event)    { 
  //   this.list.language  = EnumLanguages[parseInt($event.target.value)];
  //   this.questionService.getLevels(this.list.language).subscribe(levels => {
  //     console.log(levels);
  //     this.exams.length = 1;
  //     for(let i=0 ; i<levels.length ; i++) {
  //       this.exams.push( { "id": i+1, "name":levels[i] } );
  //     }
  //   })
  //   this.list.exam = this.exams[0].name;
  //   this.getQuestionList(); 
  // }

  startAttempt(testTemplateId) {
     //navigate to /question/:questionId
     this.router.navigate(['/attempts/start', testTemplateId.toString(), this.getStudentId().toString()]);
     //console.log(questionId.toString());
  }

  editTestTemplate(testTemplateId) {
     this.router.navigate(['/testtemplates', testTemplateId.toString(),'edit']);
  }

  getStudentId(): number {
    return this.globalService.getStudentID();
  }

  getInstructorId(): number {
    return this.globalService.getInstructorID();
  }

}