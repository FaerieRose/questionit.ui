/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 17 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */

import { Injectable } from '@angular/core';
import { Response }   from '@angular/http';

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

	// -------------------------------------------------------------
	// Returns the received JSON data if the response from the GET is 200, otherwise an empty JSON object
	public getExtractData(res: Response) {
		if (res.status == 200 || res.status == 202) {
			console.log("Response from " + res.url + ": Status: " + res.status);
			console.log(res.json());
			return res.json();
		} else if (res.status == 204){
			console.log("Response from " + res.url + ": Status: " + res.status);
			return { "id":-1 }
		} else {
			console.error("Response from " + res.url + ": Status: " + res.status);
			return { "id":-1 }
		}
  }


}