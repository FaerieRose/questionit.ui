//  author: Dave Schellekens
//  date: 20-12-2016 



import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { GlobalService } from '../global.service';
import { InstructorService } from './instructor.service';
import { Instructor } from './instructor';


@Component({
  selector: 'landing-instructor',
  templateUrl: 'instructor-landing.component.html',
  styleUrls: ['instructor.component.css'],
  providers: [InstructorService]

})
export class InstructorLandingComponent {
  instructor: Instructor;
  instructorList: Instructor[];

  constructor(
    private instructorService: InstructorService,
    private globalService: GlobalService,
    private router: Router
    ) {
    let instructorID = this.globalService.getInstructorID();
    console.log("instuctorID: " + instructorID);
    //this.instructor = new Instructor();
    this.instructorService.getInstructorById(instructorID).subscribe(instructor => this.instructor = instructor);
  }

    goToOverview(){
        alert("not implemented yet");   //doesn't exist yet
    }
    

    goToCreateExam(){
        this.globalService.setSelectedTemplateID(-1);
        this.router.navigate(['createtest']);
    }

    goToCreateUsers(){
        alert("not implemented yet");   //doesn't exist yet
    }

    goToLogin(){
        this.router.navigate(['login']);
    }
    
}
