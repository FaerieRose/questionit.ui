/* ----------------------------------------------------------------------------------- */
/* Author       : S.Martens                                                            */
/* Date created : 20 Dec 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Attempt }                 from '../attempt/attempt';
import { Student }                 from './student';
import { AttemptService }        from '../attempt/attempt.service';
import { StudentService }        from '../student/student.service';
import { Router }                from '@angular/router';

@Component({
  selector: 'my-studentlogin',
  templateUrl: 'studentlogin.component.html',
  styleUrls: [ 'student.component.css' ],
  providers: [ AttemptService , StudentService]
})

export class StudentLoginComponent implements OnInit {

  constructor(
        private route: ActivatedRoute,
        private attemptService  : AttemptService,
        private router: Router
  ) { }

  ngOnInit() {
    
  }

  studentNewAttempt(student_id) : void{
      this.router.navigate(['choosetesttemplate']);
  }
  
  studentLogOut(){
      this.router.navigate(['login']);
  }


}