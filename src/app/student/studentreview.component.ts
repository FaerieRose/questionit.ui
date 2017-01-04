/* ----------------------------------------------------------------------------------- */
/* Author       : D.Schellekens                                                        */
/* Date created : 04 Jan 2017                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit }      from '@angular/core';
import { Router }                 from '@angular/router';
//import { Attempt }                from '../attempt/attempt';
import { Student }                from './student';
import { GlobalService }          from '../global.service';
import { AttemptService }         from '../attempt/attempt.service';
import { StudentService }         from '../student/student.service';
import { EnumLanguages }          from '../enums'; 


@Component({
  selector: 'my-studentreview',
  templateUrl: 'studentreview.component.html',
  styleUrls: [ 'student.component.css' ],
  providers: [ AttemptService , StudentService]
})

export class StudentReviewComponent implements OnInit {

  //currentStudent = null;
  currentStudentID = null;
  currentStudentName = null;
  currentStudentAttempts = [];
  attemptStartDates = [];           //: string[]; NOPE...defining array type makes field undefined...?!?!
  attemptLanguages = [];
  attemptScores = [];

  constructor(
        private globalService: GlobalService,
        //private attemptService  : AttemptService,
        private studentService  : StudentService,
        private router: Router
  ) { }

  ngOnInit() {
    this.currentStudentID = this.globalService.getStudentID();
    this.currentStudentName = this.globalService.getStudentName();
    this.attemptStartDates.length = 0;
    this.attemptLanguages.length = 0;
    this.attemptScores.length = 0;
    this.studentService.getStudentAttemptsForReview(this.currentStudentID).subscribe(attempts =>{
      this.currentStudentAttempts = attempts;
      console.log(JSON.stringify(this.currentStudentAttempts));
      for (var i = 0; i < this.currentStudentAttempts.length; i++){
        this.attemptStartDates.push((new Date(this.currentStudentAttempts[i].startDateTime)).toLocaleString());
        this.attemptLanguages.push(EnumLanguages[this.currentStudentAttempts[i].testTemplateProgrammingLanguage]);
        //sanity check: don't want NaN or negative values
        this.attemptScores.push(this.currentStudentAttempts[i].testScore > 0 ? this.currentStudentAttempts[i].testScore * 100 : 0 );
    }
    });

    // this.currentStudent = null;
    // this.studentService.getStudentById(this.globalService.getStudentID()).subscribe(student =>{
    //   console.log(JSON.stringify(student));
    //   this.currentStudentAttempts = student.attempts;
    //   this.attemptStartDates.length = 0;
    //   this.currentStudentScores.length = this.currentStudentAttempts.length;
    //   this.attemptLanguages.length = 0;
    //   for (var i = 0; i < this.currentStudentAttempts.length; i++){
    //     this.attemptStartDates.push((new Date(this.currentStudentAttempts[i].startDateTime)).toLocaleString());
    //     this.attemptLanguages.push(EnumLanguages[this.currentStudentAttempts[i].testTemplate.programmingLanguage]);
    //     //TODO this runs into async probls...
    //     this.attemptService.getScoresRate(this.currentStudentAttempts[i].id).subscribe(score =>{
    //       this.currentStudentScores[i] = score;
    //       console.log("ngoninit. i: " + i + " crntscr[i]: " + this.currentStudentScores[i] + " score: " + score);
    //     });
    //   }
    //   this.currentStudent = student;
    //   console.log("done in studentreview.Oninit, example startdate: " + new Date(this.currentStudent.attempts[0].startDateTime));
    // });
  }

  goBack(){
    this.router.navigate(['studentlogin']);
  }

}