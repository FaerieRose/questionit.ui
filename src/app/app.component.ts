/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 10 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */

import { Component }         from '@angular/core';
import { Router }            from '@angular/router';

import { GlobalService }     from './global.service';
import { InstructorService } from './instructor/instructor.service';
import { Instructor }        from './instructor/instructor';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [ GlobalService, InstructorService ]
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
      private router: Router) {
    this.upodate();
    this.imageUrl = this.globalService.getBaseUrlImage();
  }

  navQuestion() {
    this.router.navigate(['/question']);
  }

  upodate() {
    this.instructorId = this.globalService.getInstructorID();
    this.studentId = this.globalService.getStudentID();
    if (this.instructorId > 0) {
      this.instructorService.getInstructorById(this.instructorId).subscribe(instructor => this.instructorName = instructor.firstName);
    }
    if (this.studentId > 0) {
      this.instructorName = "Remond Karst";
    }
  }

}
