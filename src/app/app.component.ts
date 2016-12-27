/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 10 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */

import { Component }         from '@angular/core';
import { Router }            from '@angular/router';

import { GlobalService }     from './global.service';
import { InstructorService } from './instructor/instructor.service';
import { Instructor }        from './instructor/instructor';
import { StudentService }    from './student/student.service';
import { Student }           from './student/student';
// import { Instructors }        from './instructor/instructors';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [ InstructorService, StudentService ]
})
export class AppComponent {
  title = 'Q u e s t i o n I T';
  instructorId: number;
  instructorName: string;
  studentId: number;
  studentName: string;
  imageUrl: string;

  constructor(
      private globalService: GlobalService,
      private instructorService: InstructorService, 
      private studentService: StudentService, 
      private router: Router) {
    //this.update();
    this.imageUrl = this.globalService.getBaseUrlImage();
  }

  // navQuestion() {
  //   this.router.navigate(['/question']);
  // }

  update() {
    this.instructorId = this.globalService.getInstructorID();
    this.studentId = this.globalService.getStudentID();
    if (this.instructorId > 0) {
      this.instructorService.getInstructorById(this.instructorId).subscribe(instructor => this.instructorName = instructor.firstName);
    }
    if (this.studentId > 0) {
      this.studentService.getStudentById(this.studentId).subscribe(student => this.studentName = student.firstName);
    }
  }

}
