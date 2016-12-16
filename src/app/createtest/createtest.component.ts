/* ----------------------------------------------------------------------------------- */
/* Author       : Rik & Rémond                                                         */
/* Date created : 15 Dec 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../global.service';
import { TestTemplate } from '../testtemplate/testtemplate';

import { TestTemplateService }   from '../testtemplate/testtemplate.service';

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
  questionList: Question[];
  testTemplateList: TestTemplate[];
  list = { "exam": EnumExams[0], "language": EnumLanguages[0], "enabled": true, "obsolete": false }

  constructor(
    private questionService: QuestionService,
    private createTestService: TestTemplateService,
    private globalService: GlobalService,
    private router: Router) {
    this.languages = this.globalService.getLanguages();
    this.exams.push({ "id": 0, "name": "NONE" });
  }

  ngOnInit() {
    this.getQuestionList();

  }

  getQuestionList() {
    this.questionService.getQuestions(this.list.exam, this.list.language, this.list.enabled, this.list.obsolete).subscribe(questions => {
      this.questionList = questions;
      console.log(this.questionList.length);
    });
  }

  updateLanguage($event) {
    this.list.language = EnumLanguages[parseInt($event.target.value)];
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

  addOrRemoveQuestionFromTest($event, questionId : number){
    console.log("in the addOrRemoveQuestionFromTest with question id :" + questionId);
  }

  updateExam($event) { this.list.exam = EnumExams[parseInt($event.target.value)]; this.getQuestionList(); }
}