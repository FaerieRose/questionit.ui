/* ----------------------------------------------------------------------------------- */
/* Author       : S.Martens                                                            */
/* Date created : 19 Dec 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Attempt }                 from '../attempt/attempt';
import { Student }                 from './student';
import { AttemptService }        from '../attempt/attempt.service';
import { StudentService }        from '../student/student.service';

@Component({
  selector: 'my-studentreview',
  templateUrl: 'studentreview.component.html',
  styleUrls: [ 'student.component.css' ],
  providers: [ AttemptService , StudentService]
})

export class StudentReviewComponent implements OnInit {

  constructor(
        private route: ActivatedRoute,
        private attemptService  : AttemptService,
  ) { }

  ngOnInit() {

  }


}