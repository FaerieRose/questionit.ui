/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 17 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */

import {Injectable} from '@angular/core';

@Injectable()
export class GlobalService {
  private instructorID: number = -1;
  private studentID: number = -1;
  private baseUrl: string;

  constructor() {
		let hostName: string = window.location.hostname;
    console.log(hostName.substring(0,4));
		if (hostName.substring(0,4) == "ques") {
			this.baseUrl = "http://api.questionit.carpago.nl/api/";
		} else {
			this.baseUrl = "http://" + hostName + ":8081/api/";
		}
		console.log("Base url: " + this.baseUrl);
  }

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

  public getBaseUrl() {
    return this.baseUrl;
  }
}