
/**
 * Author       : Dave Schellekens                                                     
 * Date created : 15 Dec 2016                                                          
 * Rebuilt      : 06-01-2017, Dave Schellekens
 * 
 *
 * routing to this component requires selectedtesttemplate to be set in globalService.
 * Setting it to -1 will let user create a new testtemplate.
 *********************************************************************************************/

import { Component, OnInit } from '@angular/core';

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
  //testTemplateList: TestTemplate[];
  questionListFilter = { "exam": EnumExams[0], "language": EnumLanguages[0], "enabled": true }
  questionListIsReady = false;
  bCreateTest = false;

  constructor(
    private questionService: QuestionService,
    private testTemplateService: TestTemplateService,
    private globalService: GlobalService,
    ) {
    this.languages = this.globalService.getLanguages();
    this.exams = this.globalService.getExams();
  }

  ngOnInit() {
    if (this.globalService.getSelectedTemplateID() > -1) {
      this.bCreateTest = false;
      this.testTemplateService.getTestTemplateMetaById(this.globalService.getSelectedTemplateID()).subscribe(ttbasic =>{
        console.log("fetched testtemplatebasic: " + JSON.stringify(ttbasic));
        console.log("questionsIds: " + ttbasic.questionsIds);
        this.testTemplate = new TestTemplate();
        this.testTemplate.id = ttbasic.id;
        this.testTemplate.attemptTimeInMinutes = ttbasic.attemptTimeInMinutes;
        this.testTemplate.forExam = ttbasic.forExam;
        this.testTemplate.enabled = ttbasic.enabled;
        this.testTemplate.name = ttbasic.name;
        this.testTemplate.programmingLanguage = ttbasic.programmingLanguage;
        this.testTemplate.forExam = ttbasic.forExam;
        console.log("testtemplate created from meta data: " + JSON.stringify(this.testTemplate));
        //ok, now get questionlist!
        this.questionListFilter.exam = EnumExams[this.testTemplate.forExam];
        this.questionListFilter.language = EnumLanguages[this.testTemplate.programmingLanguage];
        this.questionListFilter.enabled = true;
        this.getQuestionList(ttbasic);
      });
    } else {
      this.bCreateTest = true;
      this.testTemplate = new TestTemplate();
      this.testTemplate.attemptTimeInMinutes = null;
      this.testTemplate.forExam = 0;
      this.testTemplate.enabled = false; // A test template is disabled by default
      this.testTemplate.name = "";
      this.testTemplate.programmingLanguage = 0;
      this.testTemplate.questions = [];
    }
  }

  getQuestionList(ttbasic: TestTemplateModelBasic) {
    this.questionService.getQuestions(this.questionListFilter.exam, this.questionListFilter.language, this.questionListFilter.enabled).subscribe(questions => {
      this.questionList = questions;
      console.log("questionlist length: " + this.questionList.length);
      this.includeInTest = [];
      for (var i = 0; i < this.questionList.length; i++) {
        this.includeInTest.push(false);
        if (ttbasic != null) {
          if (ttbasic.questionsIds.indexOf(this.questionList[i].id) > -1) {this.includeInTest[i] = true;}
        }
      }
      console.log("this.includeIntest: " + this.includeInTest);
      this.questionListIsReady = true;
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
    this.getQuestionList(null);
  }

  saveTest() {
    if (this.includeInTest.every(lmnt => lmnt == false)) {
      alert("No questions selected; Exam has not been saved");
    } else {
      this.testTemplate.questions = [];
      let template = this.testTemplate;
      //add marked questions (just the id field) to testtemplate
      for (var i = 0; i < this.questionList.length; i++){
            if (this.includeInTest[i] == true) {
              var qstn = new Question;
              qstn.id = this.questionList[i].id;
              template.questions.push(qstn);
            }
        }
      //template should be ready for putting now
      console.log("about to PUT testtemplate: " + JSON.stringify(template));
      this.testTemplateService.putTestTemplateWithQuestions(template).subscribe(res => {
         console.log("PUT done. returned result: " + res);
         if (res == -1) {
           alert("Oops! Something went wrong...");
         } else {
           alert("Exam saved to DB.");
         }
      });
    }
  }

  updateExam($event) {
    this.questionListFilter.exam = EnumExams[parseInt($event.target.value)]; this.testTemplate.forExam = parseInt($event.target.value);
    this.getQuestionList(null);
  }
  
  updateIncludedQuestions(index, $event) {
    //console.log("before change: " + this.includeInTest);
    this.includeInTest[index] = $event.target.checked;
    //console.log("after change: " + this.includeInTest);
  }

}