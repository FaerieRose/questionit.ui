import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { InstructorService } from './instructor.service';
import { Instructor } from './instructor';


@Component({
  selector: 'my-instructor',
  templateUrl: 'instructor.component.html',
  styleUrls: ['instructor.component.css'],
  providers: [InstructorService]

})
export class InstructorComponent implements OnInit {
  instructor: Instructor;
  instructorList: Instructor[];

  constructor(
    private instructorService: InstructorService,
    private globalService: GlobalService) {

    this.instructor = new Instructor();
    this.instructorService.getInstructorById(1).subscribe(instructor => this.instructor = instructor);
  }

  ngOnInit() {
    this.getInstructorById(1);
    this.getInstructorList();
  }

  getInstructorById(id: number) {
    //   this.instructor = null;
    this.instructorService.getInstructorById(id).subscribe(instructor => {
      if (instructor.id == 1) {
        console.log("---- NEW INSTRUCTOR CREATED");
        this.instructor = new Instructor();
      } else {
        this.instructor = instructor;
      }
    });
  }

  getInstructorList() {
    this.instructorService.getInstructors().subscribe(instructors => {
      this.instructorList = instructors;
      console.log(this.instructorList.length);
    });
  }

  saveUpdatedInstructor(instr: Instructor) {
    this.instructorService.postNewInstructor(instr).subscribe(Instructor => {
      console.log("POST SUCCEEDED");
    });
  }

  saveInstructor() {
    let instr = this.instructor;
    this.instructorService.postNewInstructor(instr).subscribe(Instructor => {
      console.log("POST SUCCEEDED");
      this.getInstructorList();
    });
  }

  updateListFirstName($event, i: number) { this.instructorList[i].firstName = $event.target.value; this.saveUpdatedInstructor(this.instructorList[i]) }
  updateListLastName($event, i: number) { this.instructorList[i].lastName = $event.target.value; this.saveUpdatedInstructor(this.instructorList[i]) }
  updateListEmail($event, i: number) { this.instructorList[i].email = $event.target.value; this.saveUpdatedInstructor(this.instructorList[i]) }
  updateFirstName($event) { this.instructor.firstName = $event.target.value; }
  updateLastName($event) { this.instructor.lastName = $event.target.value; }
  updateEmail($event) { this.instructor.email = $event.target.value; }
  updatevalid($event) { this.instructor.valid = $event.target.value; }


}
