/* ----------------------------------------------------------------------------------- */
/* Author       : Rik & Rémond                                                         */
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
  templateUrl: 'bindinstructortoclass.component.html',
  styleUrls: ['instructor.component.css'],
  providers: [StudentClassService, InstructorService]
})
export class BindInstructorToClassComponent implements OnInit {
  instructor: Instructor; // Create 1 instance of instructor
  instructorList: Instructor[]; //Create variable to hold all instructors Used in the HTML used in the ngFor list
  studentClass: StudentClass; //Create 1 instance of StudentClass
  studentClassList: StudentClass[]; // Create variable to hold all studentClasses Used in the HTML used in the ngFor list

  constructor(
    private instructorService: InstructorService, // Needed to access the methods for instructor
    private studentClassService: StudentClassService,// Needed to access the methods for studentclass
    private globalService: GlobalService) {// Needed to access the methods for globalService
  }

  ngOnInit() { // Like the name says this method will be executed on page load
    this.getInstructorList(true);
    this.getStudentClassList(true);
  }

  updateInstructor($event)   { 
    this.instructorService.getInstructorById(parseInt($event.target.value)).subscribe(instructor => {
      this.instructor = instructor;
    });
   } //Gets instructor on update
      
  updateStudentClass($event) { 
    this.studentClassService.getStudentClassById(parseInt($event.target.value)).subscribe(studentclass => { // Same as above but then for studentclasses
      this.studentClass = studentclass;  // Same as above but then for studentclasses
    });
   } //Gets studentclass on update

  getStudentClassList(setStudentClass: boolean) {
    this.studentClassService.getStudentClasses().subscribe(studentClasses => { // Same as above but then for studentclasses
      this.studentClassList = studentClasses;  // Same as above but then for studentclasses
      if (setStudentClass) this.studentClass = this.studentClassList[0];
    });
  }

  getInstructorList(setInstructor: boolean) {
    this.instructorService.getInstructors().subscribe(instructors => { // Go to the instructorService and ask method getInstructorsForClass to give all instructors
      this.instructorList = instructors; // In the locale variable instructorList place the outcome of getInstructorsForClass
      if (setInstructor) this.instructor = this.instructorList[0];
    });
  }

  saveInstructorToClass() { //Save method for saving instructor in an studentclass and posting it in the database
    console.log("in saveInstructorToClass Studentid =: " + this.studentClass.id + " instructorid = : " +this.instructor.id)
    this.studentClassService.postInstructorToStudentClass(this.studentClass.id, this.instructor.id).subscribe(nr => {
      this.getInstructorList(false);
      this.getStudentClassList(false);
    });
  }

  updateCurrentStudentClass($event, i: number) { 
    this.studentClassList[i].id = $event.target.value; 
    this.studentClass.id = this.studentClassList[i].id;
  }
  
  updateCurrentInstructor($event, i: number) { 
    this.instructorList[i].id = $event.target.value;
    this.instructor.id = this.instructorList[i].id;
  }
}