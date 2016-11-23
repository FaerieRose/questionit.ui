/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 17 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Injectable } from '@angular/core';
import { Response }   from '@angular/http';

import { EnumLanguages }         from './enums'; 
import { EnumExams }             from './enums'; 

@Injectable()
export class GlobalService {
  private instructorID: number = 1;
  private studentID: number = -1;
  private baseUrl: string;
	private languages = [];
	private exams = [];

  constructor() {
		this.defineBaseUrl();
		this.defineEnumsAsArrays();
  }

  public getInstructorID(): number {
    return this.instructorID;
  }
  public setInstructorID(id: number) {
    this.instructorID = id;
    this.studentID = -1;
  }

  public getStudentID(): number {
    return this.studentID;
  }
  public setStudentID(id: number) {
    this.instructorID = -1;
    this.studentID = id;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

	public getLanguages() {
		return this.languages;
	}

	public getExams() {
		return this.exams;
	}

	// -------------------------------------------------------------
	// Returns the received JSON data if the response from the GET is 200, otherwise an empty JSON object
	public getExtractData(res: Response) {
		if (res.status == 200 || res.status == 202) {
			console.log("Response from " + res.url + ": Status: " + res.status);
			return res.json();
		} else if (res.status == 204){
			console.log("Response from " + res.url + ": Status: " + res.status);
			return { "id":-1 }
		} else {
			console.error("Response from " + res.url + ": Status: " + res.status);
			return { "id":-1 }
		}
  }

	// -------------------------------------------------------------
	// Returns the received JSON data if the response from the GET is 200, otherwise an empty JSON object
	public getExtractText(res: Response) {
		if (res.status == 200 || res.status == 202) {
			console.log("Response from " + res.url + ": Status: " + res.status);
			return parseInt(res.text());
		} else if (res.status == 204){
			console.log("Response from " + res.url + ": Status: " + res.status);
			return -1;
		} else {
			console.error("Response from " + res.url + ": Status: " + res.status);
			return -1;
		}
  }

	private defineBaseUrl() {
		let hostName: string = window.location.hostname;
    console.log(hostName.substring(0,4));
		if (hostName.substring(0,4) == "ques") {
			this.baseUrl = "http://api.questionit.carpago.nl/api/";
		} else {
			this.baseUrl = "http://" + hostName + ":8081/api/";
		}
		console.log("Base url: " + this.baseUrl);
	}

	private defineEnumsAsArrays() {
    let lang = EnumLanguages;
    let i = 0;
    while (lang[i] != null) {
      let language = { id: i, name: lang[i] };
      this.languages.push(language);
      i++;
    }
    let exams = EnumExams;
    i = 0;
    while (exams[i] != null) {
      let exam = { id: i, name: exams[i] };
      this.exams.push(exam);
      i++;
    }
	}

}
