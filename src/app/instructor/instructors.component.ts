/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 23 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit } from '@angular/core';

import { Instructor } from './instructor';
import { InstructorService } from './instructor.service';
import { GlobalService } from '../global.service';
import { StudentClassService } from '../studentclasses/studentclass.service';
import { StudentClass } from '../studentclasses/studentclass';

import { EnumLanguages } from '../enums';
import { EnumExams } from '../enums';

@Component({
  selector: 'my-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['instructor.component.css'],
  providers: [InstructorService]
})
export class InstructorsComponent implements OnInit {
  languages = [];
  exams = [];
  instructorList: Instructor[];
  list = { "exam": EnumExams[0], "language": EnumLanguages[0], "enabled": true, "obsolete": false }

  constructor(
    private instructorService: InstructorService,
    private globalService: GlobalService) {
    this.languages = this.globalService.getLanguages();
    this.exams = this.globalService.getExams();
  }

  ngOnInit() {
    this.getInstructorList();
  }

  getInstructorList() {
    this.instructorService.getInstructors().subscribe(instructors => {
      this.instructorList = instructors;
      console.log(this.instructorList.length);
    });
  }

  updateLanguage($event) { this.list.language = EnumLanguages[parseInt($event.target.value)]; this.getInstructorList(); }
  updateExam($event) { this.list.exam = EnumExams[parseInt($event.target.value)]; this.getInstructorList(); }
  updateEnabled($event) { this.list.enabled = $event.target.value; this.getInstructorList(); }
  updateObsolete($event) { this.list.obsolete = $event.target.value; this.getInstructorList(); }


}