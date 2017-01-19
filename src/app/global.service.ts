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
  private instructorName: string = "";
  private selectedTemplateID: number = -1;
	private studentID: number = -1;
  private studentName: string = "";
	private currentAttemptID: number = -1;				//id of attempt currently in progress
	private currentQuestionNr: number = -1;				//index [1, currentQuestionAmount] of currently displayed attempt question.
	private currentQuestionAmount: number = -1;		//amount of questions in current attempt.
	//private loginID: number;
  private baseUrl: string;
  private baseUrlImage: string;
	private languages = [];
	private exams = [];
	private version: String = "20170119_1300"; // Update this string for each merge with develop branch.

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

	public setSelectedTemplateID(templID: number) {
		this.selectedTemplateID = templID;
	}

	public getSelectedTemplateID(): number {
		return this.selectedTemplateID;
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

  public getCurrentAttemptID(): number {
    return this.currentAttemptID;
  }
  public setCurrentAttemptID(id: number) {
    this.currentAttemptID = id;
	}

	public setCurrentQuestionAmount(amount: number){
		this.currentQuestionAmount = amount;
	}

	public getCurrentQuestionAmount(): number{
		return this.currentQuestionAmount;
	}

  public getCurrentQuestionNr(): number {
    return this.currentQuestionNr;
  }

  public setCurrentQuestionNr(qNr: number) {
    if ((qNr <= this.currentQuestionAmount) && (qNr > 0)) this.currentQuestionNr = qNr;
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

	public getVersion(): String {
    return this.version;
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
