/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 10 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit } from '@angular/core';

import { Observable }        from 'rxjs';

import { Question }          from './question';
import { QuestionService }   from './question.service';

@Component({
  selector: 'my-question',
  templateUrl: 'question.component.html',
  styleUrls: ['question.styles.css'],
  providers: [ QuestionService ]
})
export class QuestionComponent implements OnInit {
  question: Question;

  constructor(private questionService: QuestionService) {
  }

  ngOnInit() {
    this.questionService.getQuestion(1).subscribe(question => this.question = question);
  }

  changeId($event) {
    let id = $event.target.value;
    this.questionService.getQuestion(id).subscribe(question => this.question = question);
  }
  
}