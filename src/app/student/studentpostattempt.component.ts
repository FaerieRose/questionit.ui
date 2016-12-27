/* ----------------------------------------------------------------------------------- */
/* Author       : S.Martens                                                            */
/* Date created : 27 Dec 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Attempt }                 from '../attempt/attempt';
import { Student }                 from './student';
import { AttemptService }        from '../attempt/attempt.service';
import { StudentService }        from '../student/student.service';
import { Router }                from '@angular/router';

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
        private router: Router
  ) { }

  ngOnInit() {
    
  }

  studentFinishAttempt() : void{
      this.router.navigate(['attemptscore/:1']);
  }
  
  studentBackContinue(){
      this.router.navigate(['/question/show']);
  }  

}