import { Component } from '@angular/core';

import { Question }  from './question';

@Component({
  selector: 'my-question',
  templateUrl: 'question.component.html',
  styleUrls: ['question.styles.css']
})
export class QuestionComponent {
  q: Question = new Question();

  constructor() {
    this.q.id = 72;
    this.q.name = "Rosalynn";
  }

}