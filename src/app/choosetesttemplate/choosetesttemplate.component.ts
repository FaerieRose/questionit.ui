/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 23 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';

import { GlobalService }            from '../global.service';
import { TestTemplateModelBasic }   from '../testtemplate/testtemplatemodelbasic';
import { TestTemplateService }      from '../testtemplate/testtemplate.service';

import { EnumLanguages }            from '../enums'; 
import { EnumExams }                from '../enums'; 

@Component({
  selector: 'my-testtemplates',
  templateUrl: './choosetesttemplate.component.html',
  styleUrls: [ './choosetesttemplate.component.css' ],
  providers: [ TestTemplateService ]
})
export class ChooseTestTemplateComponent implements OnInit {
  languages = [];
  //exams = [];
  //testTemplateList: TestTemplate[];
  testTemplateList: TestTemplateModelBasic[];
 // list = { "exam":EnumExams[0], "language":EnumLanguages[0], "enabled": true, "obsolete":false }

  constructor(
        private testTemplateService  : TestTemplateService,
        private globalService    : GlobalService,
        private router: Router) { 
    this.languages = this.globalService.getLanguages();
    //this.exams.push( { "id": 0, "name":"NONE" } );
  }

  ngOnInit() {
    this.getTestTemplateListMeta(0); // 0 -> no filter on language
  }

  getTestTemplateListMeta(languageId : number) {
    this.testTemplateService.getTestTemplatesMeta().subscribe(testTemplates => { //this.list.exam, this.list.language, this.list.enabled, this.list.obsolete).subscribe(questions => {
      this.testTemplateList = testTemplates.filter(tt => this.isAvailableToUser(tt, languageId));
      //this.testTemplateList = testTemplates;
    }); 
  }

  
  // Not used...
  // getTestTemplateListSelection() {
  //   this.testTemplateService.getTestTemplatesMeta().subscribe(testTemplates => { 
  //     testTemplates = testTemplates.filter(testTemplate => testTemplate.programmingLanguage == 0);
  //     this.testTemplateList = testTemplates;
  //     //console.log(this.testTemplateList.length);
  //   }); 
  // }

  /*
   * Callback function for the test templates array filter
   */
  isAvailableToUser(tt, languageId): boolean {
    if (languageId > 0) {
      return (tt.programmingLanguage == languageId && tt.enabled);
    } else {
      return tt.enabled;
    }
  }

  // getTestTemplateListSelectionLanguage(languageId : number) {
  //   this.testTemplateService.getTestTemplatesMeta().subscribe(testTemplates => { 
  //     this.testTemplateList = testTemplates.filter(tt => this.isAvailableToUser(tt, languageId));
  //     //this.testTemplateList = testTemplates;
  //   }); 
  // }

  updateLanguage($event)    {
    var languageId : number;
    languageId  = parseInt($event.target.value);
    this.testTemplateList = undefined;
    //this.getTestTemplateListSelectionLanguage(languageId);
    this.getTestTemplateListMeta(languageId);
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

  goToPreAttempt(testTemplateId) {
     //navigate to /startattempt/:testTemplateId
     this.router.navigate(['choosetesttemplate/startattempt', testTemplateId.toString()]);
  }

  editTestTemplate(testTemplateId) {
     this.globalService.setSelectedTemplateID(testTemplateId);
     this.router.navigate(['createtest']);
  }

  getStudentId(): number {
    return this.globalService.getStudentID();
  }

  getInstructorId(): number {
    return this.globalService.getInstructorID();
  }

  getEnumLanguages(nrEnum : number): String{
    return EnumLanguages[nrEnum];
  }

  getEnumExams(nrEnum : number): String{
    return EnumExams[nrEnum];
  }

}