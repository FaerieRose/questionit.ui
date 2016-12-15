/* ----------------------------------------------------------------------------------- */
/* Author       : Rik & Rémond                                                         */
/* Date created : 30 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';


import { StudentClassService } from './studentclass.service';
import { StudentClass } from './studentclass';

import { Instructor } from '../instructor/instructor';
import { InstructorService } from '../instructor/instructor.service';



@Component({
  selector: 'my-studentclass',
  templateUrl: './studentclass.component.html',
  styleUrls: ['studentclass.component.css'],
  providers: [StudentClassService]

})
export class StudentClassComponent implements OnInit {
  instructor: Instructor; // Create 1 instance of instructor
  instructorList: Instructor[]; //Create variable to hold all instructors Used in the HTML used in the ngFor list
  studentclass: StudentClass;
  studentClassList: StudentClass[];
  list = { "studentclass": StudentClass[0] }

  constructor(private studentClassService: StudentClassService, private globalService: GlobalService, private instructorService: InstructorService) {
    // Needed to access the methods for instructor
    this.studentclass = new StudentClass;
    this.studentclass.name = "eerstetest";
    this.studentClassService.getStudentClassById(1).subscribe(studentclass => this.studentclass = studentclass);
  }
  ngOnInit() {
    this.instructorService.getInstructors().subscribe(instructors => { // Go to the instructorService and ask method getInstructorsForClass to give all instructors
      this.instructorList = instructors; // In the locale variable instructorList place the outcome of getInstructorsForClass
      this.instructor = this.instructorList[0];
    });
    this.getStudentClassById(1);
    this.getStudentClassList();
  }


  getStudentClassById(id: number) {
    //   this.studentclass = null;
    this.studentClassService.getStudentClassById(id).subscribe(studentclass => {
      if (studentclass.id == 1) {
        console.log("---- NEW STUDENT CREATED");
        this.studentclass = new StudentClass();
      } else {
        this.studentclass = studentclass;
      }
    });
  }



  getStudentClassList() {
    this.studentClassService.getStudentClasses().subscribe(studentclass => {
      this.studentClassList = studentclass;
      console.log(this.studentClassList.length);
    });
  }

  saveUpdatedStudentclass(instr: StudentClass) {
    this.studentClassService.postNewStudentclass(instr).subscribe(Studentclass => {
      console.log("POST SUCCEEDED");
    });
  }
  updateClassName($event, i: number) { this.studentClassList[i].name = $event.target.value; this.saveUpdatedStudentclass(this.studentClassList[i]) }

  saveStudentclass() {
    let instr = this.studentclass;
    this.studentClassService.postNewStudentclass(instr).subscribe(Studentclass => {
      console.log("POST SUCCEEDED");
      this.getStudentClassList();
    });
  }

  updateListName($event, i: number) { this.studentClassList[i].name = $event.target.value; this.saveUpdatedStudentclass(this.studentClassList[i]) }
  updateName($event) { this.studentclass.name = $event.target.value; }
  updateStudentClass($event) { console.log("inhoud is " + $event.target.value); this.studentclass.name = $event.target.value; }

}