import { Component, OnInit }    from '@angular/core';
import { GlobalService }        from '../global.service';
import { StudentService }       from './student.service';
import { Student }              from './student';


@Component({
  selector: 'my-student',
  templateUrl: 'student.component.html',
  styleUrls: [ 'student.component.css' ],
  providers: [ StudentService ]

})
export class StudentComponent implements OnInit {
  student: Student;

  constructor(
          private studentService: StudentService,
          private globalService    : GlobalService) {

    this.student = new Student();
    this.studentService.getStudentById(1).subscribe(student => this.student = student);
  }

 changeId($event) {
    let id = $event.target.value;
    this.getStudentById(id);
  }

  ngOnInit() {
    this.getStudentById(1);
  }

 getStudentById(id: number) {
    this.studentService.getStudentById(id).subscribe(student => {
      if (student.id==1){
        console.log("---- NEW STUDENT CREATED");
        this.student = new Student();
        
      }else {
        this.student = student;
      }



    });
  }
  saveStudent() {
    let stud = this.student;

        this.studentService.postNewStudent(stud).subscribe(Student => {
          console.log("POST SUCCEEDED");
        });
      }
   updateFirstName($event) { this.student.firstName = $event.target.value; }
   updateLastName($event) { this.student.lastName = $event.target.value; }
   updateEmail($event) { this.student.email = $event.target.value; }
   updateID($event) { this.student.id = $event.target.value; }
   updatevalid($event) { this.student.valid = $event.target.value; }

  }


