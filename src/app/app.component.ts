/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 10 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */

import { Component }         from '@angular/core';
import { Router }            from '@angular/router';

import { GlobalService }     from './global.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'Q u e s t i o n I T';
  instructor: number;
  student: number;

  constructor(private globalService: GlobalService, private router: Router) {
    this.instructor = this.globalService.getInstructorID();
    this.student = this.globalService.getStudentID();
  }

  navQuestion() {
    this.router.navigate(['/question']);
  }

}
