import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';


import { StudentClassService } from './studentclass.service';
import { StudentClass } from './studentclass';

// import { Instructor }               from '../instructor/instructor';
// import { InstructorService }        from '../instructor/instructor.service';



@Component({
  selector: 'my-studentclass',
  templateUrl: './studentclass.component.html',
  providers: [StudentClassService]

})
export class StudentClassComponent implements OnInit {
  studentclass: StudentClass;
  studentClassList: StudentClass[];
  list = { "studentclass": StudentClass[0] }

  constructor(private studentClassService: StudentClassService, private globalService: GlobalService) {
    this.studentclass = new StudentClass;
    this.studentclass.name = "eerstetest";
    this.studentClassService.getStudentClassById(1).subscribe(studentclass => this.studentclass = studentclass);
  }
  ngOnInit() {
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

  saveStudentclass() {
    let instr = this.studentclass;
    this.studentClassService.postNewStudentclass(instr).subscribe(Studentclass => {
      console.log("POST SUCCEEDED");
      this.getStudentClassList();
    });
  }

  updateListName($event, i: number) { this.studentClassList[i].name = $event.target.value; this.saveUpdatedStudentclass(this.studentClassList[i]) }
  //   updateListLastName($event, i: number) { this.studentClassList[i].lastName = $event.target.value; this.saveUpdatedStudentclass(this.studentClassList[i]) }
  //   updateListEmail($event, i: number) { this.studentClassList[i].email = $event.target.value; this.saveUpdatedStudentclass(this.studentClassList[i]) }
  updateName($event) { this.studentclass.name = $event.target.value; }
  //   updateLastName($event) { this.studentclass.lastName = $event.target.value; }
  //   updateEmail($event) { this.studentclass.email = $event.target.value; }
  //   updatevalid($event) { this.studentclass.valid = $event.target.value; }
  updateStudentClass($event) { this.list.studentclass = $event.target.value; }

}