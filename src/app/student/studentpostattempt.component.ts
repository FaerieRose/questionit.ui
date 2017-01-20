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
  attemptId: number;

  constructor(
        private route: ActivatedRoute,
        private attemptService  : AttemptService,
        private studentService : StudentService,
        private router: Router,
        private globalService: GlobalService
  ) { }

  ngOnInit() {
    this.attemptId = this.globalService.getCurrentAttemptID().valueOf();
    this.getReviewIncorrectChoices();
    this.getMarkedQuestions();
  }

  studentFinishAttempt() : void{
    this.endAttempt();  
    this.router.navigate(['attemptscore/'+ this.attemptId]);
  }
  
  returnToLastKnownPosition() {
    this.returnToQuestion(this.globalService.getCurrentQuestionNr());
  }  
  
  endAttempt() {
    this.studentService.postEndAttempt(this.attemptId).subscribe(Student => {
      // Should we do globalService.setCurrentAttemptID(-1) here?
      console.log("POST end attempt made");
      }); 
  }
  
  // getReviewIncorrectChoices(attempt_id){
  //   this.attemptService.getReviewIncorrectChoices(attempt_id).subscribe(reviewIncorrectChoices => {
  //     this.reviewIncorrectChoices = reviewIncorrectChoices;
  //     // console.log(this.reviewIncorrectChoices);
  //     }); 
  // }
  getReviewIncorrectChoices(){
    this.attemptService.getReviewIncorrectChoices(this.attemptId).subscribe(reviewIncorrectChoices => {
      this.reviewIncorrectChoices = reviewIncorrectChoices;
      console.log("StudentPostAttemptComponent.getReviewIncorrectChoices: " + this.reviewIncorrectChoices);
      }); 
  }

  // getMarkedQuestions(attempt_id){
  //   this.attemptService.getMarkedQuestions(attempt_id).subscribe(markedQuestions => {
  //     this.markedQuestions = markedQuestions;
  //     // console.log(this.markedQuestions);
  //     }); 
  // }
  getMarkedQuestions(){
    this.attemptService.getMarkedQuestions(this.attemptId).subscribe(markedQuestions => {
      this.markedQuestions = markedQuestions;
      // console.log(this.markedQuestions);
      }); 
  }

  returnToQuestion(questionNr) {
    console.log("returnToQuestion(" + questionNr + ")");
    //this.attemptService.getQuestion(this.attemptId, questionNr);
    this.globalService.setCurrentQuestionNr(questionNr);
    this.router.navigate(['attempt']);
  }
  
}