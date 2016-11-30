/* ----------------------------------------------------------------------------------- */
/* Author       : Rik & Rémond                                                           */
/* Date created : 30 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';

import { Instructor } from './instructor';
import { InstructorService } from './instructor.service';


import { StudentClassService } from '../studentclasses/studentclass.service';
import { StudentClass } from '../studentclasses/studentclass';
import { StudentClassComponent } from '../studentclasses/studentclass.component';



@Component({
  selector: 'my-bindinstructortoclass',
  // templateUrl: './bindinstructortoclass.component.html',
  templateUrl: 'bindinstructortoclass.component.html',
  styleUrls: ['instructor.component.css'],
  providers: [StudentClassService, InstructorService]
})
export class BindInstructorToClassComponent implements OnInit {
  instructor: Instructor; // Create 1 instance of instructor
  instructors = []; // Create a Array of instructors
  instructorList: Instructor[]; //Create variable to hold all instructors Used in the HTML used in the ngFor list
  studentclass: StudentClass; //Create 1 instance of StudentClass
  studentClassList: StudentClass[]; // Create variable to hold all studentClasses Used in the HTML used in the ngFor list
  list = { "instructor": Instructor[0] } // Create variable list with objects of instructor
  classList = { "studentclass": StudentClass[0] } // Create variable list with objects of studentclass


  constructor(
    private instructorService: InstructorService, // Needed to access the methods for instructor
    private studentClassService: StudentClassService,// Needed to access the methods for studentclass
    private globalService: GlobalService) {// Needed to access the methods for globalService
  }

  ngOnInit() { // Like the name says this method will be executed on page load
    this.instructorService.getInstructorsForClass(this.list.instructor).subscribe(instructors => { // Go to the instructorService and ask method getInstructorsForClass to give all instructors
      this.instructorList = instructors; // In the locale variable instructorList place the outcome of getInstructorsForClass
    });
    this.studentClassService.getStudentClasses().subscribe(studentClasses => { // Same as above but then for studentclasses
      this.studentClassList = studentClasses;  // Same as above but then for studentclasses
    });
  }

  updateInstructor($event) { this.list.instructor = $event.target.value; } // Saves instructor on update
  updateStudentClass($event) { this.classList.studentclass = $event.target.value; } //Saves studentclass on update

  saveInstructorToClass() { //Save method for saving instructor in an studentclass and posting it in the database
    console.log(" IN saveInstructorToClass "); // Just for checking and following
    let instr = new Instructor();
    instr.firstName = "test";
    this.instructor ;
    let studcl = this.classList.studentclass;
    console.log("We zijn een stap verder.");

    console.log("in sinstr zit :" + instr);
    console.log("in studcl zit : " + studcl);

    //  this.studentClassService.postInstructorToStudentClass(studcl, instr.id)



    this.instructorService.postNewInstructor(instr).subscribe(instructor=> {
      console.log(" IN 2 saveInstructorToClass "); // Just for checking and following
      if (instructor.id > 0) {
        console.log(" IN 3 saveInstructorToClass ");
        this.studentClassService.postInstructorToStudentClass(studcl, instr.id).subscribe(studentclass => {
          console.log("POST INSTRUCTOR ADDING TO CLASS SUCCEEDED");
        });
      }
    });
  }


}