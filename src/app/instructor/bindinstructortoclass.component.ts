/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 23 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit } from '@angular/core';

import { Instructor } from './instructor';
import { InstructorService } from './instructor.service';
import { GlobalService } from '../global.service';

import { StudentClassService } from '../studentclasses/studentclass.service';
import { StudentClass } from '../studentclasses/studentclass';
import { StudentClassComponent } from '../studentclasses/studentclass.component';

import { EnumLanguages } from '../enums';
import { EnumExams } from '../enums';

@Component({
  selector: 'my-bindinstructortoclass',
  templateUrl: './bindinstructortoclass.component.html',
  styleUrls: ['instructor.component.css'],
  providers: [InstructorService, StudentClassService]
})
export class BindInstructorToClassComponent implements OnInit {
  instructor: Instructor;
  instructors = [];
  languages = [];
  exams = [];
  instructorList: Instructor[];
  studentclass: StudentClass;
  studentClassList: StudentClass[];
  list = { "instructor": Instructor[0] }


  constructor(
    private instructorService: InstructorService,
    private studentClassService: StudentClassService,
    private globalService: GlobalService) {
    this.languages = this.globalService.getLanguages();
    this.exams = this.globalService.getExams();
  }

  ngOnInit() {
    this.getInstructorList();
    this.studentClassService.getStudentClasses().subscribe(studentClasses => {
      this.studentClassList = studentClasses;
    });
  }


  //onderstaande weg en net als boven interpreteren
  getInstructorList() {
    this.instructorService.getInstructorsForClass(this.list.instructor).subscribe(instructors => {
      this.instructorList = instructors;
    });
  }


  updateInstructor($event) { this.list.instructor = $event.target.value; }

  saveInstructorToClass() {
    console.log(" IN saveInstructorToClass ");
    let instr = this.instructor;
    let studcl = this.studentclass;

  //  this.studentClassService.postInstructorToStudentClass(studcl, instr.id)

  

    this.instructorService.postInstructorId(this.instructor.id).subscribe(instructorId => {
      console.log(" IN 2 saveInstructorToClass ");
      if (instructorId > 0) {
        console.log(" IN 3 saveInstructorToClass ");
        this.studentClassService.postInstructorToStudentClass(studcl, instr.id).subscribe(studentclass => {
          console.log("POST INSTRUCTOR ADDING TO CLASS SUCCEEDED");
        });
      }
    });
  }


}