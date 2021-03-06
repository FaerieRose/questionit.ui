/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose, Bas Smulders                                             */
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
  languages = []; // Used for the programming language filter
  //exams = [];
  testTemplateList: TestTemplateModelBasic[];
  //list = { "exam":EnumExams[0], "language":EnumLanguages[0], "enabled": true, "obsolete":false }

  constructor(
        private testTemplateService: TestTemplateService,
        private globalService: GlobalService,
        private router: Router
        ) { 
    this.languages = this.globalService.getLanguages();
  }
  ngOnInit() {
    this.getTestTemplateList(EnumLanguages.NONE); // initially no filter on language
  }

  getTestTemplateList(languageId : EnumLanguages) {
    this.testTemplateService.getTestTemplatesMeta().subscribe(testTemplates => {
      this.testTemplateList = testTemplates.filter(tt => this.isAvailableToUser(tt, languageId));
    }); 
  }

  /*
   * Callback function for the test templates array filter
   */
  isAvailableToUser(tt, languageId): boolean {
    if (languageId != EnumLanguages.NONE) {
      return (tt.programmingLanguage == languageId && (tt.enabled || this.globalService.getInstructorID() > 0));
    } else {
      return tt.enabled || this.globalService.getInstructorID() > 0;
    }
  }

  updateLanguage($event)    {
    var languageId : EnumLanguages;
    languageId  = parseInt($event.target.value);
    this.testTemplateList = undefined;
    this.getTestTemplateList(languageId);
   }

  goToPreAttempt(testTemplateId) {
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

  getYesNo(b: boolean): String {
    return (b ? "Yes" : "No");
  }

}