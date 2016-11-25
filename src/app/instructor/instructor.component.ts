import { Component, OnInit }  from '@angular/core';
import { GlobalService }            from '../global.service';
import { InstructorService }  from './instructor.service';
import { Instructor }         from './instructor';


@Component({
  selector: 'my-instructor',
  templateUrl: 'instructor.component.html',
  styleUrls: [ 'instructor.component.css' ],
  providers: [ InstructorService ]

})
export class InstructorComponent implements OnInit {
  instructor: Instructor;
  instructorList: Instructor[];

  constructor(
          private instructorService: InstructorService,
          private globalService    : GlobalService) {

    this.instructor = new Instructor();
 // this.instructor.firstName = "remond";
    this.instructorService.getInstructorById(1).subscribe(instructor => this.instructor = instructor);
  }

 changeId($event) {
    let id = $event.target.value;
    this.getInstructorById(id);
  }

  ngOnInit() {
    this.getInstructorById(1);
    this.getInstructorList();
   // this.instructor = this.globalService.getInstructorID();
  }

 getInstructorById(id: number) {
 //   this.instructor = null;
    this.instructorService.getInstructorById(id).subscribe(instructor => {
      if (instructor.id==1){
        console.log("---- NEW INSTRUCTOR CREATED");
        this.instructor = new Instructor();
        
      }else {
        this.instructor = instructor;
      }



    });
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
   updateID($event) { this.instructor.id = $event.target.value; }
   updatevalid($event) { this.instructor.valid = $event.target.value; }


   showAllInstructors(){
      var element = document.getElementById("instructorlist").appendChild(document.createElement("article"));
      console.log("Element = " + element);
   }
     getInstructorList() {
    this.instructorService.getInstructors().subscribe(instructors => {
      this.instructorList = instructors;
      console.log(this.instructorList.length);
    }); 
  }
  }


