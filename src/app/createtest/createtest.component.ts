/* ----------------------------------------------------------------------------------- */
/* Author       : Rik & Rémond                                                         */
/* Date created : 15 Dec 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalService } from '../global.service';
import { TestTemplate } from '../testtemplate/testtemplate';

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
  questionList: Question[];
  testTemplateList: TestTemplate[];
  list = { "exam": EnumExams[0], "language": EnumLanguages[0], "enabled": true, "obsolete": false }

  constructor(
    private questionService: QuestionService,
    private createTestService: TestTemplateService,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private router: Router) {
    this.testTemplate = new TestTemplate();
    this.languages = this.globalService.getLanguages();
    this.exams.push({ "id": 0, "name": "NONE" });
  }

  ngOnInit() {
    //  let id = +this.route.snapshot.params['id'];
    // console.log("===---HET ID---==="+id);
    this.getTestTemplate(0);
    this.getQuestionList();

    //  this.getTestTemplateById(1);
    this.testTemplate = new TestTemplate();

  }

  getTestTemplate(id: number) {
    this.testTemplate = null;
    if (id == 0) {
      this.testTemplate = new TestTemplate();
      this.testTemplate.attemptTimeInMinutes = 0;
      this.testTemplate.forExam = 0;
      this.testTemplate.isEnabled = true;
      this.testTemplate.name = "";
      this.testTemplate.programmingLanguage = 0;
      this.testTemplate.questions = null;
      this.testTemplate.size = 0;
      this.saveTest();

    } else {
      this.createTestService.getTestTemplateById(id).subscribe(testTemplate => {
        this.testTemplate = testTemplate;


      });
    }
  }



  getTestTemplateById(id: number) {

    this.createTestService.getTestTemplateById(id).subscribe(testTemplate => {
      if (testTemplate.id == 1) {
        this.testTemplate = new TestTemplate();
      } else {
        this.testTemplate = testTemplate;
      }
    });
  }

  getQuestionList() {
    this.questionService.getQuestions(this.list.exam, this.list.language, this.list.enabled, this.list.obsolete).subscribe(questions => {
      this.questionList = questions;
      console.log(this.questionList.length);
    });
  }

  updateLanguage($event) {
    this.list.language = EnumLanguages[parseInt($event.target.value)];
    this.testTemplate.programmingLanguage = parseInt($event.target.value);
    this.questionService.getLevels(this.list.language).subscribe(levels => {
      console.log(levels);
      this.exams.length = 1;
      for (let i = 0; i < levels.length; i++) {
        this.exams.push({ "id": i + 1, "name": levels[i] });
      }
    })
    this.list.exam = this.exams[0].name;
    this.getQuestionList();
  }

  addOrRemoveQuestionFromTest($event, questionId: number, value: boolean) {
    console.log ("de waarde van checked :" + $event.target.checked);
if($event.target.checked){

  console.log("*********************************************************");
    this.createTestService.addQuestionToTemplate(this.testTemplate.id, questionId).subscribe(q => { });
  }else{console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    this.createTestService.removeQuestionToTemplate(this.testTemplate.id, questionId).subscribe(q => { });
  }
  }
  saveTest() {
    let template = this.testTemplate;
    if (template.id == -1) { this.testTemplate.id = 1; }
    this.createTestService.postNewTestTemplate(template).subscribe(TestTemplate => {
      this.testTemplate.id = TestTemplate.id;
    });
  }
  updateTestName($event) { this.testTemplate.name = $event.target.value; }
  updateExam($event) {
    this.list.exam = EnumExams[parseInt($event.target.value)]; this.testTemplate.forExam = parseInt($event.target.value);
    this.getQuestionList();
  }
  updateDuration($event) { this.testTemplate.attemptTimeInMinutes = $event.target.value; }

}