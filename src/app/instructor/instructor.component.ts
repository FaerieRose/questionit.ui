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
    this.instructor.firstName = "Rik";
    this.instructorService.getInstructorById(1).subscribe(instructor => this.instructor = instructor);
  }


}