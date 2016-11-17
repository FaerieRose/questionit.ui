 import {Injectable} from '@angular/core';

  @Injectable()
  export class GlobalService {
    private instructorID: number = -1;
    private studentID: number = -1;

    public getInstructorID() {
      return this.instructorID;
    }
    public setInstructorID(id: number) {
      this.instructorID = id;
      this.studentID = -1;
    }

    public getStudentID() {
      return this.studentID;
    }
    public setStudentID(id: number) {
      this.instructorID = -1;
      this.studentID = id;
    }

  }