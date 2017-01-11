/* ----------------------------------------------------------------------------------- */
/* Author       : Rik & Rémond                                                         */
/* Date created : 15 Dec 2016                                                          */
/* Rebuilt      : 06-01-2017, Dave Schellekens
 * 
 * May be modified later to include editing existing testtemplates. for now create only.
 ----------------------------------------------------------------------------------- */
import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute, Params } from '@angular/router';
//import { Router } from '@angular/router';

import { GlobalService } from '../global.service';
import { TestTemplate } from '../testtemplate/testtemplate';
import { TestTemplateModelBasic } from '../testtemplate/testtemplatemodelbasic';

import { TestTemplateService } from '../testtemplate/testtemplate.service';

import { QuestionService } from '../question/question.service';
import { Question } from '../question/question';

import { EnumLanguages } from '../enums';
import { EnumExams } from '../enums';

@Component({
  selector: 'my-createtest',
  templateUrl: './createtest.component.html',
  styleUrls: ['./createtest.component.css'],
  providers: [TestTemplateService, QuestionService]
})
export class CreateTestComponent implements OnInit {
  languages = [];
  exams = [];
  testTemplate: TestTemplate;
  questionList = [];
  includeInTest: Boolean[];
  testTemplateList: TestTemplate[];
  questionListFilter = { "exam": EnumExams[0], "language": EnumLanguages[0], "enabled": true }
  questionListIsReady = false;

  constructor(
    private questionService: QuestionService,
    private testTemplateService: TestTemplateService,
    private globalService: GlobalService,
    //private route: ActivatedRoute,
    //private router: Router
    ) {
    //this.testTemplate = new TestTemplate();
    this.languages = this.globalService.getLanguages();
    //this.exams.push({ "id": 0, "name": "NONE" });       dropdown list not working correctly. instead getexams
    this.exams = this.globalService.getExams();
  }

  ngOnInit() {
    //TODO selectedtemplateID needs to be set at just before every route to this component!!!
    if (this.globalService.getSelectedTemplateID() > -1) {
      this.testTemplateService.getTestTemplateMetaById(this.globalService.getSelectedTemplateID()).subscribe(ttbasic =>{
        console.log("fetched testtemplatebasic: " + JSON.stringify(ttbasic));
        let tiereliere = ttbasic.questionsIds;
        console.log("questionsIds: " + tiereliere);
        this.testTemplate = new TestTemplate();
        this.testTemplate.attemptTimeInMinutes = ttbasic.attemptTimeInMinutes;
        this.testTemplate.forExam = ttbasic.forExam;
        this.testTemplate.isEnabled = ttbasic.isEnabled;
        this.testTemplate.name = ttbasic.name;
        this.testTemplate.programmingLanguage = ttbasic.programmingLanguage;
        this.testTemplate.forExam = ttbasic.forExam;
        console.log("testtemplate created from metameuk: " + JSON.stringify(this.testTemplate));
        //ok, now get questionlist!
        this.questionListFilter.exam = EnumExams[this.testTemplate.forExam];
        this.questionListFilter.language = EnumLanguages[this.testTemplate.programmingLanguage];
        this.questionListFilter.enabled = true;
        this.getQuestionList(ttbasic);
       
        // this.testTemplate.questions = [];  
        // for (let qstnID of ttbasic.questionIDs) {
        //   var questjun = new Question();
        //   questjun.id = qstnID;
        //   this.testTemplate.questions.push(questjun);
        // }
      });
        
    } else {
      this.testTemplate = new TestTemplate();
      this.testTemplate.attemptTimeInMinutes = null;
      this.testTemplate.forExam = 0;
      this.testTemplate.isEnabled = true;
      this.testTemplate.name = "";
      this.testTemplate.programmingLanguage = 0;
      this.testTemplate.questions = [];
    }
  }

  // getTestTemplate(id: number) {
  //     this.testTemplateService.getTestTemplateById(id).subscribe(testTemplate => {
  //       this.testTemplate = testTemplate;
  //     });
  //   }
  // }

  // getTestTemplateById(id: number) {
  //   this.testTemplateService.getTestTemplateById(id).subscribe(testTemplate => {
  //     if (testTemplate.id == 1) {
  //       this.testTemplate = new TestTemplate();
  //     } else {
  //       this.testTemplate = testTemplate;
  //     }
  //   });
  // }

  getQuestionList(ttbasic: TestTemplateModelBasic) {
    this.questionService.getQuestions(this.questionListFilter.exam, this.questionListFilter.language, this.questionListFilter.enabled).subscribe(questions => {
      this.questionList = questions;
      console.log("questionlist length: " + this.questionList.length);
      this.includeInTest = [];
      for (var i = 0; i < this.questionList.length; i++) {
        this.includeInTest.push(false);
        //TODO check if ttbasic == null?
        if (ttbasic.questionsIds.indexOf(this.questionList[i].id) > -1) {this.includeInTest[i] = true;}
      }
      console.log("this.includeIntest: " + this.includeInTest);
      this.questionListIsReady = true;
    });
  }


  //TODO Have removed call to this from html, because of ngmodel binding. needs check if all is still well. WTF is levels???
  updateLanguage($event) {
    this.questionListFilter.language = EnumLanguages[parseInt($event.target.value)];
    this.testTemplate.programmingLanguage = parseInt($event.target.value);
    this.questionService.getLevels(this.questionListFilter.language).subscribe(levels => {
      console.log(levels);
      this.exams.length = 1;
      for (let i = 0; i < levels.length; i++) {
        this.exams.push({ "id": i + 1, "name": levels[i] });
      }
    })
    this.questionListFilter.exam = this.exams[0].name;
    //TODO show warning that this will undo question selection?
    this.getQuestionList(null);
  }

  saveTest() {
    if (this.includeInTest.every(lmnt => lmnt == false)) {
      alert("No questions selected; Exam has not been saved");
    } else {
      this.testTemplate.questions = [];       //TODO check if this indeed nulls questionsarray
      let template = this.testTemplate;
      //add marked questions (just the id field) to testtemplate
      for (var i = 0; i < this.questionList.length; i++){
            if (this.includeInTest[i] == true) {
              //this.testTemplateService.addQuestionToTemplate(this.testTemplate.id, this.questionList[i].id).subscribe();
              var qstn = new Question;
              qstn.id = this.questionList[i].id;    //assuming all other fields will be null.
              template.questions.push(qstn);
            }
        }
      //template should be ready for putting now
      console.log("about to PUT testtemplate: " + JSON.stringify(template));
      this.testTemplateService.putTestTemplateWithQuestions(template).subscribe(res => {
         console.log("PUT done. returned result: " + res);
         if (res == 1) {
           alert("Exam saved to DB.");
         } else {
           alert("Oops! Something went wrong...");
         }
      });
    }
  }

  // updateTestName($event) {
  //    this.testTemplate.name = $event.target.value;
  // }

  updateExam($event) {
    this.questionListFilter.exam = EnumExams[parseInt($event.target.value)]; this.testTemplate.forExam = parseInt($event.target.value);
    //TODO show warning that this will undo question selection?
    this.getQuestionList(null);
  }
  
  // updateDuration($event) {
  //    this.testTemplate.attemptTimeInMinutes = $event.target.value;
  // }

  updateIncludedQuestions(index, $event) {
    //console.log("before change: " + this.includeInTest);
    this.includeInTest[index] = $event.target.checked;
    //console.log("after change: " + this.includeInTest);
  }

}