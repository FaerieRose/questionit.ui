/* ----------------------------------------------------------------------------------- */
/* Author       : S.Martens                                                            */
/* Date created : 19 Dec 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit }      from '@angular/core';
//import { ActivatedRoute, Params } from '@angular/router';
import { Attempt }                from '../attempt/attempt';
import { Student }                from './student';
import { GlobalService }          from '../global.service';
import { AttemptService }         from '../attempt/attempt.service';
import { StudentService }         from '../student/student.service';

@Component({
  selector: 'my-studentreview',
  templateUrl: 'studentreview.component.html',
  styleUrls: [ 'student.component.css' ],
  providers: [ AttemptService , StudentService]
})

export class StudentReviewComponent implements OnInit {

  currentStudent: Student;
  currentStudentAttempts: Attempt[];
  currentStudentScores: number[];

  constructor(
        private globalService: GlobalService,
        private attemptService  : AttemptService,
        private studentService  : StudentService
  ) { }

  ngOnInit() {
    this.currentStudent = null;
    this.studentService.getStudentById(this.globalService.getStudentID()).subscribe(student =>{
      this.currentStudent = student;
      this.currentStudentAttempts = student.attempts;
      for (var i = 0; i < this.currentStudentAttempts.length; i++){
        this.attemptService.getScoresRate(this.currentStudentAttempts[i].id).subscribe(score =>{
          this.currentStudentScores[i] = score;
        })
      }
    })
  }


}