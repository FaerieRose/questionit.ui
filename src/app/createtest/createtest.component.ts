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
    console.log("Het ID is nu: " + this.testTemplate.id);  

    //  this.getTestTemplateById(1);
    this.testTemplate = new TestTemplate();

  }

  getTestTemplate(id: number) {
    this.testTemplate = null;
    if (id == 0) {
      console.log("----NEW TESTTEMPLATE CREATED");
      this.testTemplate = new TestTemplate();
      //put forexam init (and others?) here
      this.testTemplate.attemptTimeInMinutes=0;
      this.testTemplate.forExam=0;
      this.testTemplate.isEnabled=true;
      this.testTemplate.name = "";
      this.testTemplate.programmingLanguage=0;
      this.testTemplate.questions = null;
      this.testTemplate.size=0;
      this.saveTest();
      console.log("---- TEMPLATE id ="+this.testTemplate.id);

    } else {
      this.createTestService.getTestTemplateById(id).subscribe(testTemplate => {
        this.testTemplate = testTemplate;

      
      });
}}



    getTestTemplateById(id: number) {
      console.log("in the getTestTemplateById with ID: " + id);
      //   this.instructor = null;
      this.createTestService.getTestTemplateById(id).subscribe(testTemplate => {
        if (testTemplate.id == 1) {
          console.log("---- NEW INSTRUCTOR CREATED in instructor compoment");
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
      this.testTemplate.programmingLanguage = parseInt($event.target.value); console.log("WAARDE VOOR LANGUAGE ID :" + this.testTemplate.programmingLanguage);
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

    addOrRemoveQuestionFromTest($event, questionId: number) {
      //   this.saveTest();
      console.log("in the addOrRemoveQuestionFromTest with question id :" + questionId + " and templateid : " + this.testTemplate.id);
      this.createTestService.addQuestionToTemplate(this.testTemplate.id, questionId).subscribe(q => { });
    }

    saveTest() {
      console.log("in the savetest");
      let template = this.testTemplate;
      console.log("in the savetest with template : " + template.id + " en ALS EXAMEN : " + template.forExam);
      if (template.id == -1) { this.testTemplate.id = 1; }
      this.createTestService.postNewTestTemplate(template).subscribe(TestTemplate => {
        console.log("POST SUCCEEDED");
        this.testTemplate.id = TestTemplate.id;
        console.log("in de saveTest met this.testTemplate.id :" + this.testTemplate.id)
      });
    }
    updateTestName($event) { this.testTemplate.name = $event.target.value; }
    updateExam($event) { this.list.exam = EnumExams[parseInt($event.target.value)]; this.testTemplate.forExam = parseInt($event.target.value); console.log("WAARDE VOOR FOREXAM ID :" + this.testTemplate.forExam); this.getQuestionList(); }
    updateDuration($event){ this.testTemplate.attemptTimeInMinutes = $event.target.value; }

  }