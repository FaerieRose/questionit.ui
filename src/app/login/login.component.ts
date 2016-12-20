/* ----------------------------------------------------------------------------------- */
/* Author       : Dave Schellekens                                                     */
/* Date created : 20 Dec 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { GlobalService } from '../global.service';

//import { StudentClassService } from '../studentclasses/studentclass.service';
//import { StudentClass } from '../studentclasses/studentclass';
//import { StudentClassComponent } from '../studentclasses/studentclass.component';

import { StudentService } from '../student/student.service';
import { InstructorService } from '../instructor/instructor.service';
import { Student } from '../student/student';
import { Instructor } from '../instructor/instructor';


@Component({
  selector: 'my-login',
  templateUrl: 'login.component.html',
  //styleUrls: ['login.component.css'],
  providers: [InstructorService, StudentService ]

})
export class LoginComponent {
    students: Student[];
    instructors: Instructor[];
  
  constructor(
    private studentService: StudentService,
    private instructorService: InstructorService,
    private router: Router
    //private globalService: GlobalService
    ) {
  }

  trylogin(loginName: String){
      //ideally, will lookup username in single userlist (students AND instructors), using an extra field like "loginname" or by mailaddress
      //for now:
      //  - password/authentication not yet implemented
      //  - will use firstname to "login".
      //  - will keep instructor/student userlists, so have to check both.
      //assumption: no identical usernames across students/instructors.
    this.studentService.getStudents().subscribe(students => {
        this.students = students;
        for (let stdnt of this.students) {
            if (stdnt.firstName === loginName){
                //goto student landing page
                this.router.navigate(['student/landing']);          //not using routeparam for id because of -yet to be implemented- authentication
                console.log("if you're reading this, things don't work as planned...");
            }
        }   
    });
    //console.log("if you're reading this, things don't work as planned...");
    this.instructorService.getInstructors().subscribe(instructors => {
        this.instructors = instructors;
        for (let instrctr of this.instructors) {
            if (instrctr.firstName === loginName){
                //goto instructor landing page
                 this.router.navigate(['instructor/landing']);      //not using routeparam for id because of -yet to be implemented- authentication
                 console.log("if you're reading this, things don't work as planned...");
            }
    }
    });
  }
    
}


