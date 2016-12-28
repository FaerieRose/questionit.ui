/* ----------------------------------------------------------------------------------- */
/* Author       : S.Martens                                                            */
/* Date created : 27 Dec 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Attempt }                from '../attempt/attempt';
import { Student }                from './student';
import { AttemptService }         from '../attempt/attempt.service';
import { StudentService }         from '../student/student.service';
import { Router }                 from '@angular/router';
import { GlobalService }          from '../global.service';

@Component({
  selector: 'my-studentpostattempt',
  templateUrl: 'studentpostattempt.component.html',
  styleUrls: [ 'student.component.css' ],
  providers: [ AttemptService , StudentService]
})

export class StudentPostAttemptComponent implements OnInit {
  reviewIncorrectChoices : number[];
  markedQuestions : number[];

  constructor(
        private route: ActivatedRoute,
        private attemptService  : AttemptService,
        private studentService : StudentService,
        private router: Router,
        private globalService: GlobalService
  ) { }

  ngOnInit() {
    var attempt_id = this.globalService.getAttemptID().valueOf();
   //  var attempt_id = 2;
 
    this.getReviewIncorrectChoices(attempt_id);
    this.getMarkedQuestions(attempt_id);
  }

  studentFinishAttempt() : void{
    var attempt_id : Number = 1;
    // var id : Number = 3;
    // this.globalService.setAttemptID(id.valueOf());
    attempt_id = this.globalService.getAttemptID().valueOf();
    this.EndAttempt(attempt_id);  
    this.router.navigate(['attemptscore/'+ attempt_id]);
  }
  
  studentBackContinue(){
    this.router.navigate(['/question/show']);
  }  
  
  EndAttempt(attempt_id) {
    this.studentService.postEndAttempt(attempt_id).subscribe(Student => {
      console.log("POST end attempt made");
      }); 
  }
  
  getReviewIncorrectChoices(attempt_id){
    this.attemptService.getReviewIncorrectChoices(attempt_id).subscribe(reviewIncorrectChoices => {
      this.reviewIncorrectChoices = reviewIncorrectChoices;
      // console.log(this.reviewIncorrectChoices);
      }); 
  }

  getMarkedQuestions(attempt_id){
    this.attemptService.getMarkedQuestions(attempt_id).subscribe(markedQuestions => {
      this.markedQuestions = markedQuestions;
      // console.log(this.markedQuestions);
      }); 
  }

  
}