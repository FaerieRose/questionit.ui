//  author: Dave Schellekens
//  date: 20-12-2016 



import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

//import { GlobalService } from '../global.service';
import { InstructorService } from './instructor.service';
import { Instructor } from './instructor';


@Component({
  selector: 'landing-instructor',
  templateUrl: 'instructor-landing.component.html',
  styleUrls: ['instructor-landing.component.css'],
  providers: [InstructorService]

})
export class InstructorLandingComponent {
  instructor: Instructor;
  instructorList: Instructor[];

  constructor(
    private instructorService: InstructorService,
    //private globalService: GlobalService
    private router: Router
    ) {

    //this.instructor = new Instructor();
    //this.instructorService.getInstructorById(1).subscribe(instructor => this.instructor = instructor);
  }

    goToOverview(){
        this.router.navigate(['instructor/landing']);   //doesn't exist yet
    }
    

    goToCreateExam(){
        this.router.navigate(['instructor/landing']);   //doesn't exist yet
    }

    goToCreateUsers(){
        this.router.navigate(['instructor/landing']);   //doesn't exist yet
    }

    backToLogin(){
        this.router.navigate(['login']);
    }
    
}
