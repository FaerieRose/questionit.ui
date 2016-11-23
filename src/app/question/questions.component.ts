/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 23 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit }     from '@angular/core';

import { Question }              from './question';
import { QuestionService }       from './question.service';
import { GlobalService }         from '../global.service';

import { EnumLanguages }         from '../enums'; 
import { EnumExams }             from '../enums'; 

@Component({
  selector: 'my-questions',
  templateUrl: './questions.component.html',
  styleUrls: [ 'question.component.css' ],
  providers: [ QuestionService ]
})
export class QuestionsComponent implements OnInit {
  languages = [];
  exams = [];
  questionList: Question[];
  list = { "exam":EnumExams[0], "language":EnumLanguages[0], "enabled": true, "obsolete":false}

  constructor(
        private questionService  : QuestionService,
        private globalService    : GlobalService) { 
    this.languages = this.globalService.getLanguages();
    this.exams = this.globalService.getExams();
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

  updateLanguage($event)    { this.list.language  = EnumLanguages[parseInt($event.target.value)]; this.getQuestionList(); }
  updateExam($event)        { this.list.exam      = EnumExams[parseInt($event.target.value)];     this.getQuestionList(); }
  updateEnabled($event)     { this.list.enabled   = $event.target.value;                          this.getQuestionList(); }
  updateObsolete($event)    { this.list.obsolete  = $event.target.value;                          this.getQuestionList(); }


}