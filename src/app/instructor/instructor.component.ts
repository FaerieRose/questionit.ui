import { Component }  from '@angular/core';

import { InstructorService }  from './instructor.service';
import { Instructor }         from './instructor';

@Component({
  selector: 'my-instructor',
  templateUrl: './instructor.component.html',
  providers: [ InstructorService ]

})
export class InstructorComponent {
  instructor: Instructor;

  constructor(private instructorService: InstructorService) {
    this.instructor = new Instructor();
 //   this.instructor.firstName = "remond";
    this.instructorService.getInstructorById(1).subscribe(instructor => this.instructor = instructor);
  }

 changeId($event) {
    let id = $event.target.value;
    this.getInstructorById(id);
  }

 getInstructorById(id: number) {
   // this.instructor = null;
    this.instructorService.getInstructorById(id).subscribe(instructor => this.instructor = instructor);{

        console.log("----NEW INSTRUCTOR CREATED");
        //this.instructor = new Instructor();


    };
  }
  saveInstructor() {
    let instr = this.instructor;

        this.instructorService.postNewInstructor(instr).subscribe(Instructor => {
          console.log("POST SUCCEEDED");
        });
      }
   updateFirstName($event) { this.instructor.firstName = $event.target.value; }
   updateLastName($event) { this.instructor.lastName = $event.target.value; }
   updateEmail($event) { this.instructor.email = $event.target.value; }
  // updateID($event) { this.instructor.id = $event.target.value; }

  }


