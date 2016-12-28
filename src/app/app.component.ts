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
  imageUrl: string;

  constructor(
      private globalService: GlobalService,
      private router: Router) {
    //this.update();
    this.imageUrl = this.globalService.getBaseUrlImage();
  }

}
