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
  styleUrls: ['login.component.css'],
  providers: [InstructorService, StudentService ]

})
export class LoginComponent implements OnInit{
    students: Student[];
    instructors: Instructor[];
  
  constructor(
    private studentService: StudentService,
    private instructorService: InstructorService,
    private router: Router,
    private globalService: GlobalService
    ) {
  }


  ngOnInit(){
      //this.globalService.setInstructorID(-1);
      //this.globalService.setStudentID(-1);
  }

  trylogin(loginName: String){
      //ideally, will lookup username in single userlist (students AND instructors), using an extra field like "loginname" or by mailaddress.
      //alternatively, create new single API call that checks both tables in backend.
      //Will largely depend on authentication solution, so kept it simple for now.
      //for now:
      //  - password/authentication not yet implemented
      //  - will use check on firstname to "login".
      //  - will keep separate instructor/student userlists, so have to check both.
      //  - assumption: no identical usernames across students/instructors.
    
    //just to be sure...
    //this.globalService.setInstructorID(-1);
    //this.globalService.setStudentID(-1);

    var userFound: boolean = false;  
    console.log("now in trylogin. loginname: " + loginName);
    this.studentService.getStudents().subscribe(students => {
        this.students = students;
        for (let stdnt of this.students) {
            if ( !userFound && (stdnt.firstName === loginName) ){
                //globally set current loginID
                this.globalService.setStudentID(stdnt.id);
                userFound = true;
                //goto student landing page
                this.router.navigate(['student/landing']);         
            }
        }   
    });
    //also check if logging in as instructor...assuming no students/instr. with same firstName.
    this.instructorService.getInstructors().subscribe(instructors => {
        this.instructors = instructors;
        for (let instrctr of this.instructors) {
            if ( !userFound && (instrctr.firstName === loginName) ){
                //globally set current loginID
                console.log(instrctr.id);
                this.globalService.setInstructorID(instrctr.id);
                userFound = true;
                //goto instructor landing page
                this.router.navigate(['instructor/landing']);      
            }
    }
    });
  }
    
}


