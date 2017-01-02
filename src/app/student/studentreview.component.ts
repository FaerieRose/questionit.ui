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

  currentStudent = null;
  currentStudentAttempts = [];
  attemptStartDates = [];           //: string[]; NOPE...defining array type makes field undefined...?!?!
  currentStudentScores = [];

  constructor(
        private globalService: GlobalService,
        private attemptService  : AttemptService,
        private studentService  : StudentService
  ) { }

  ngOnInit() {
    this.currentStudent = null;
    this.studentService.getStudentById(this.globalService.getStudentID()).subscribe(student =>{
      console.log(JSON.stringify(student));
      this.currentStudentAttempts = student.attempts;
      this.attemptStartDates.length = 1;
      this.currentStudentScores.length = 1;
      for (var i = 0; i < this.currentStudentAttempts.length; i++){
        this.attemptStartDates.push((new Date(this.currentStudentAttempts[i].startDateTime)).toLocaleString());
        //this probably runs into async probls...needs fix
        this.attemptService.getScoresRate(this.currentStudentAttempts[i].id).subscribe(score =>{
          this.currentStudentScores[i] = score;
        });
      }
      this.currentStudent = student;
      console.log("done in studentreview.Oninit, example startdate: " + new Date(this.currentStudent.attempts[0].startDateTime));
    });
  }


}