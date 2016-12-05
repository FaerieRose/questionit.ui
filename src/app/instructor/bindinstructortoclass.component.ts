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
  // templateUrl: './bindinstructortoclass.component.html',
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
    this.instructorService.getInstructors().subscribe(instructors => { // Go to the instructorService and ask method getInstructorsForClass to give all instructors
      this.instructorList = instructors; // In the locale variable instructorList place the outcome of getInstructorsForClass
      this.instructor = this.instructorList[0];
    });
    this.studentClassService.getStudentClasses().subscribe(studentClasses => { // Same as above but then for studentclasses
      this.studentClassList = studentClasses;  // Same as above but then for studentclasses
      this.studentClass = this.studentClassList[0];
    });
  }

  updateInstructor($event)   { 
    console.log("----IN updateInstructor CREATED");
    this.instructorService.getInstructorById(parseInt($event.target.value)).subscribe(instructor => {
      this.instructor = instructor;
    });
   } //Gets instructor on update
      
  updateStudentClass($event) { 
    console.log("----IN updateStudentClass CREATED :" + $event.target.value);
    this.studentClassService.getStudentClassById(parseInt($event.target.value)).subscribe(studentclass => { // Same as above but then for studentclasses
      this.studentClass = studentclass;  // Same as above but then for studentclasses
    });
   } //Gets studentclass on update

  getInstructor(id: number) {
    console.log("----IN getInstructor CREATED");
    //this.instructor = null;
    this.instructorService.getInstructorById(id).subscribe(instructor => {
      console.log("----IN getInstructor CREATED with id: " + instructor.id);
      if (instructor.id == -1) {
        console.log("----NEW INSTRUCTOR CREATED");
        this.instructor = new Instructor();
       // this.correctAnswers = this.resetCorrectAnswers();
    //    this.resetPossibleAnswers();
      } else {
        console.log("----NO NEW INSTRUCTOR CREATED");
        this.instructor = instructor;
        // if (this.question.possibleAnswers != undefined) {
        //   this.possibleAnswers = this.question.possibleAnswers;
        //   this.correctAnswers  = this.question.correctAnswers; 
        // } else {
        //   this.resetPossibleAnswers();
        // }
      }
    });
  }
    getStudentClassList() {
    this.studentClassService.getStudentClasses().subscribe(studentclass => {
      this.studentClassList = studentclass;
      console.log(this.studentClassList.length);
    });
  }

   getInstructorList() {
    this.instructorService.getInstructors().subscribe(instructor => {
      this.instructorList = instructor;
      console.log(this.instructorList.length);
    });
  }

  saveInstructorToClass() { //Save method for saving instructor in an studentclass and posting it in the database

    console.log("in saveInstructorToClass Studentid =: " + this.studentClass.id + " instructorid = : " +this.instructor.id)
    this.studentClassService.postInstructorToStudentClass(this.studentClass.id, this.instructor.id).subscribe();
    this.getInstructorList();
    this.getStudentClassList();

  }
updateCurrentStudentClass($event, i: number) { this.studentClassList[i].id = $event.target.value; this.studentClass.id = this.studentClassList[i].id }
updateCurrentInstructor($event, i: number) { this.instructorList[i].id = $event.target.value; this.instructor.id = this.instructorList[i].id }
}