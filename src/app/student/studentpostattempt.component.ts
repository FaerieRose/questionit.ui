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

  constructor(
        private route: ActivatedRoute,
        private attemptService  : AttemptService,
        private studentService : StudentService,
        private router: Router,
        private globalService: GlobalService
  ) { }

  ngOnInit() {
    
  }

  studentFinishAttempt() : void{
    var attempt_id : Number = 1;
   // this.globalService.
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
  

}