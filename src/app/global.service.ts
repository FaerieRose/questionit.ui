/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 17 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

import { EnumLanguages }  from './enums'; 
import { EnumExams }      from './enums';
import { Instructor }     from './instructor/instructor';

@Injectable()
export class GlobalService {
  private instructorID: number = -1;
  private studentID: number = -1;
  private instructorName: string = "";
  private studentName: string = "";
	private attemptID: number = -1;
	private currentQuestionIndex: number = -1;
	//private loginID: number;
  private baseUrl: string;
  private baseUrlImage: string;
	private languages = [];
	private exams = [];

  constructor(private http: Http) {
		this.defineBaseUrl();
		this.defineEnumsAsArrays();
  }

  public getInstructorID(): number {
    return this.instructorID;
  }
  public setInstructorID(id: number) {
		this.instructorID = id;
    if (id > 0){
			this.http.get(this.baseUrl + "instructors/" + this.instructorID).map(this.getExtractData).subscribe(instructor => {
					this.instructorName = instructor.firstName + " " + instructor.lastName;
			});
		}	
  }
  public getInstructorName(): string {
    return this.instructorName;
  }

  public getStudentID(): number {
    return this.studentID;
  }
  public setStudentID(id: number) {
    this.studentID = id;
    if (id >0){
			this.http.get(this.baseUrl + "students/" + this.studentID).map(this.getExtractData).subscribe(student => {
					this.studentName = student.firstName + " " + student.lastName;
			});
		}	
  }

  public getAttemptID(): number {
    return this.attemptID;
  }
  public setAttemptID(id: number) {
    this.attemptID = id;
    // this.http.get(this.baseUrl + "students/" + this.studentID).map(this.getExtractData).subscribe(student => {
    //     this.studentName = student.firstName + " " + student.lastName;
    // });	
  }

  public getCurrentQuestionIndex(): number {
    return this.currentQuestionIndex;
  }
  public setCurrentQuestionIndex(id: number) {
    this.currentQuestionIndex = id;
    // this.http.get(this.baseUrl + "students/" + this.studentID).map(this.getExtractData).subscribe(student => {
    //     this.studentName = student.firstName + " " + student.lastName;
    // });	
  }

  public getStudentName(): string {
    return this.studentName;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public getBaseUrlImage(): string {
    return this.baseUrlImage;
  }

	public getLanguages() {
		return this.languages;
	}

	public getExams() {
		return this.exams;
	}

	// -------------------------------------------------------------
	// Returns the received JSON data if the Response the GET is 200, otherwise an empty JSON object
	public getExtractData(res: Response) {
		if (res.status == 200 || res.status == 202) {
			console.log("==== Response getExtractData " + res.url + ": Status: " + res.status + ": Output "+ res);
			return res.json();
		} else if (res.status == 204){
			console.log("==== Response getExtractData " + res.url + ": Status: " + res.status);
			return { "id":-1 }
		} else {
			console.error("==== Response getExtractData " + res.url + ": Status: " + res.status);
			return { "id":-1 }
		}
  }

	// -------------------------------------------------------------
	// Returns the received JSON data if the Response the GET is 200, otherwise an empty JSON object
	public getExtractText(res: Response) {
		if (res.status == 200 || res.status == 202) {
			console.log("==== Response getExtractText " + res.url + ": Status: " + res.status);
			console.log(res.text());
			return parseInt(res.text());
		} else if (res.status == 204){
			console.log("==== Response getExtractText" + res.url + ": Status: " + res.status);
			return -1;
		} else {
			console.error("==== Response getExtractText " + res.url + ": Status: " + res.status);
			return -1;
		}
  }

	// -------------------------------------------------------------
	// Returns the received JSON data if the Response the GET is 200, otherwise an empty JSON object
	public getExtractVoid(res: Response) {
		if (res.status == 200 || res.status == 202) {
			console.log("==== Response getExtractVoid" + res.url + ": Status: " + res.status);
			return 1;
		} else if (res.status == 204){
			console.log("==== Response getExtractVoid" + res.url + ": Status: " + res.status);
			return -1;
		} else {
			console.error("==== Response getExtractVoid " + res.url + ": Status: " + res.status);
			return -1;
		}
  }

	private defineBaseUrl() {
		let hostName: string = window.location.hostname;
		if (hostName.substring(0,4) == "ques") {
			this.baseUrl = "http://api.questionit.carpago.nl/api/";
			this.baseUrlImage = "http://api.questionit.carpago.nl/images/";
		}
		// else if (hostName.substring(0,4) == "dave") {
		// 	this.baseUrl = "http://api.questionit.carpago.nl/api/";
		// 	this.baseUrlImage = "http://api.questionit.carpago.nl/images/";
		// } 
		else {
			this.baseUrl = "http://" + hostName + ":8081/api/";
			this.baseUrlImage = "http://" + hostName + ":4200/assets/images/";
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
