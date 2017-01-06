/* ----------------------------------------------------------------------------------- */
/* Author       : Rik & Rémond                                                         */
/* Date created : 15 Dec 2016                                                          */
/* Rebuilt      : 06-01-2017, Dave Schellekens
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute, Params } from '@angular/router';
//import { Router } from '@angular/router';

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
  includeInTest: Boolean[];
  testTemplateList: TestTemplate[];
  questionListFilter = { "exam": EnumExams[0], "language": EnumLanguages[0], "enabled": true }

  constructor(
    private questionService: QuestionService,
    private testTemplateService: TestTemplateService,
    private globalService: GlobalService,
    //private route: ActivatedRoute,
    //private router: Router
    ) {
    //this.testTemplate = new TestTemplate();
    this.languages = this.globalService.getLanguages();
    this.exams.push({ "id": 0, "name": "NONE" });
  }

  ngOnInit() {
    //  let id = +this.route.snapshot.params['id'];
    // console.log("===---HET ID---==="+id);
    //this.getTestTemplate(0);
    this.testTemplate = new TestTemplate();
    this.testTemplate.attemptTimeInMinutes = 0;
    this.testTemplate.forExam = 0;
    this.testTemplate.isEnabled = true;
    this.testTemplate.name = "";
    this.testTemplate.programmingLanguage = 0;
    this.testTemplate.questions = null;
      
    
    this.getQuestionList();

    //  this.getTestTemplateById(1);
    //this.testTemplate = new TestTemplate();

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

  getQuestionList() {
    this.questionService.getQuestions(this.questionListFilter.exam, this.questionListFilter.language, this.questionListFilter.enabled).subscribe(questions => {
      this.questionList = questions;
      console.log(this.questionList.length);
      this.includeInTest = null;
      for (var i = 0; i < this.questionList.length; i++) { this.includeInTest.push(false); }
    });
  }

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
    this.getQuestionList();
  }

  addOrRemoveQuestionFromTest($event, questionIndex: number) {
    console.log ("de waarde van checked :" + $event.target.checked);
    this.includeInTest[questionIndex] = $event.target.checked;
    // if($event.target.checked){
    //   console.log("*********************************************************");
    //   this.testTemplateService.addQuestionToTemplate(this.testTemplate.id, questionId).subscribe(q => { });
    // } else {
    //   console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    //   this.testTemplateService.removeQuestionToTemplate(this.testTemplate.id, questionId).subscribe(q => { });
    // }
  }

  saveTest() {
    if (this.includeInTest.every(lmnt => lmnt == false)) {
      alert("No questions selected; Exam has not been saved");
    } else {
      let template = this.testTemplate;
      // ???? remnant of new/existing??? if (template.id == -1) { this.testTemplate.id = 1; }
      //cannot post template with list of questionIDs, only list of Questions.:(
      //this is probably the reason why questions were added/removed on checkbox click.  
      //TODO create backend call to post template together with list of questionIDs?  
      //post template first  
      this.testTemplateService.postNewTestTemplate(template).subscribe(tt => {
        this.testTemplate.id = tt.id;
        //TODO: result?
        for (var i = 0; i < this.questionList.length; i++){
            if (this.includeInTest[i] == true) {
              this.testTemplateService.addQuestionToTemplate(this.testTemplate.id, this.questionList[i].id).subscribe(q => { });
            }
        }
      });
    }
  }

  updateTestName($event) {
     this.testTemplate.name = $event.target.value;
  }

  updateExam($event) {
    this.questionListFilter.exam = EnumExams[parseInt($event.target.value)]; this.testTemplate.forExam = parseInt($event.target.value);
    this.getQuestionList();
  }
  
  updateDuration($event) {
     this.testTemplate.attemptTimeInMinutes = $event.target.value;
  }

}