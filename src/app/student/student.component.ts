/* ----------------------------------------------------------------------------------- */
/* Author       : Rik & Rémond                                                         */
/* Date created : 30 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';

import { StudentClassService } from '../studentclasses/studentclass.service';
import { StudentClass } from '../studentclasses/studentclass';
import { StudentClassComponent } from '../studentclasses/studentclass.component';

import { StudentService } from './student.service';
import { Student } from './student';


@Component({
  selector: 'my-student',
  templateUrl: 'student.component.html',
  styleUrls: ['student.component.css'],
  providers: [StudentService, StudentClassService]

})
export class StudentComponent implements OnInit {
  student: Student;
  newstudent:Student;
  studentList: Student[];
  studentClass: StudentClass; //Create 1 instance of StudentClass
  studentClassList: StudentClass[]; // Create variable to hold all studentClasses Used in the HTML used in the ngFor list

  constructor(
    private studentService: StudentService,
    private studentClassService: StudentClassService,// Needed to access the methods for studentclass
    private globalService: GlobalService) {

    this.student = new Student();
    this.studentService.getStudentById(1).subscribe(student => this.student = student);
  }

  updateStudent($event) {
    console.log("----IN updateStudent CREATED");
    this.studentService.getStudentById(parseInt($event.target.value)).subscribe(student => {
      this.student = student;
    });
  } //Gets student on update

  updateStudentClass($event) {
    console.log("----IN updateStudentClass CREATED :" + $event.target.value);
    this.studentClassService.getStudentClassById(parseInt($event.target.value)).subscribe(studentclass => { // Same as above but then for studentclasses
      this.studentClass = studentclass;  // Same as above but then for studentclasses
    });
  } //Gets studentclass on update

  changeId($event) {
    let id = $event.target.value;
    this.getStudentById(id);
  }

  ngOnInit() {
    this.getStudentById(1);
    this.getStudentList();
    this.studentClassService.getStudentClasses().subscribe(studentClasses => { // Same as above but then for studentclasses
      this.studentClassList = studentClasses;  // Same as above but then for studentclasses
      this.studentClass = this.studentClassList[0];
    });
    this.studentService.getStudents().subscribe(students => { // Go to the instructorService and ask method getInstructorsForClass to give all instructors
      this.studentList = students; // In the locale variable instructorList place the outcome of getInstructorsForClass
      this.newstudent = this.studentList[0];
    });
  }
  getStudentList() {
    this.studentService.getStudents().subscribe(students => {
      this.studentList = students;
      console.log(this.studentList.length);
    });
  }

  getStudentById(id: number) {
    this.studentService.getStudentById(id).subscribe(student => {
      if (student.id == 1) {
        console.log("---- NEW STUDENT CREATED");
        this.student = new Student();

      } else {
        this.student = student;
      }



    });
  }




  saveUpdatedStudent(instr: Student) {
    this.studentService.postNewStudent(instr).subscribe(Student => {
      console.log("POST SUCCEEDED");
    });
  }

  removeStudentFromClass(studentId: number, studentClassId: number) {
    console.log("IN removeStudentFromClass with studentId " + studentId + " and studentClassId :" + studentClassId);
    this.studentClassService.getStudentClassById(studentClassId);
    this.studentClassService.removeStudentFromClass(studentClassId, studentId).subscribe(StudentClass => {
      console.log("POST SUCCEEDED");
      this.getStudentList();
    });
  }
  removeStudent(studentId: number) {
    console.log("IN removeStudent with studentId " + studentId);
    this.studentService.getStudentById(studentId);
    this.studentService.removeStudent(studentId).subscribe(Student => {
      console.log("POST SUCCEEDED");
      this.getStudentList();
    });
  }
  saveStudent() {
    let stud = this.student;
    console.log("in saveStudent stud.id =" + stud.id + "  this.student.id = " + this.student.id);
    if (stud.id == 1) { stud.id = null; this.student.id = null; console.log("zou moeten zijn genulled"); console.log("in saveStudent stud.id =" + stud.id + "  this.student.id = " + this.student.id); }
    this.studentService.postNewStudent(stud).subscribe(Student => {
      console.log("POST SUCCEEDED");
      this.getStudentList();
    });
  }

  updateListFirstName($event, i: number) { this.studentList[i].firstName = $event.target.value; this.saveUpdatedStudent(this.studentList[i]) }
  updateListLastName($event, i: number) { this.studentList[i].lastName = $event.target.value; this.saveUpdatedStudent(this.studentList[i]) }
  updateListEmail($event, i: number) { this.studentList[i].email = $event.target.value; this.saveUpdatedStudent(this.studentList[i]) }
  updateFirstName($event) { this.student.firstName = $event.target.value; }
  updateLastName($event) { this.student.lastName = $event.target.value; }
  updateEmail($event) { this.student.email = $event.target.value; }
  updateID($event) { this.student.id = $event.target.value; }
  updatevalid($event) { this.student.valid = $event.target.value; }

  saveStudentToClass() { //Save method for saving instructor in an studentclass and posting it in the database

    console.log("in saveStudentToClass Studentid =: " + this.studentClass.id + " instructorid = : " + this.newstudent.id)
    this.studentClassService.postStudentToStudentClass(this.studentClass.id, this.newstudent.id).subscribe();
    this.getStudentList();
    this.getStudentClassList();

  }
  updateCurrentStudentClass($event, i: number) { this.studentClassList[i].id = $event.target.value; this.studentClass.id = this.studentClassList[i].id }
  updateCurrentStudent($event, i: number) { this.studentList[i].id = $event.target.value; this.student.id = this.studentList[i].id }
  getStudentClassList() {
    this.studentClassService.getStudentClasses().subscribe(studentclass => {
      this.studentClassList = studentclass;
      console.log(this.studentClassList.length);
    });
  }



}


