import { Injectable }  from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Request, RequestMethod }  from '@angular/http';

import { Observable }              from 'rxjs/Observable';

import { GlobalService }           from '../global.service';
import { Instructor }         from './instructor';


@Injectable()
export class InstructorService {
	private headers = new Headers({ 'Content-Type': 'application/json' });

	private instructorUrl: string;
	private currentUrl: string;

  constructor(private http: Http, private globalService: GlobalService) {
    this.instructorUrl = this.globalService.getBaseUrl() + 'instructors';
  }

  getInstructorById(id: number): Observable<Instructor> {
    this.currentUrl = this.instructorUrl + "/" + id;
    return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
  }
  postNewInstructor(instructor: Instructor) : Observable<Instructor> {
	//	this.currentUrl = this.instructorUrl + "/creator/1/correct-answers/" + correctAnswersId;
   // this.currentUrl = this.instructorUrl + "/instructor/";
		let instr: Instructor = new Instructor();
		instr = instructor;
    this.currentUrl = "http://localhost:8081/api/instructors";
		let jsonResult: string = JSON.stringify(instr);
		console.log("---- JSON(Instructor) = " + jsonResult);
		return this.http.post(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractData);
    
    
    //.map(this.globalService.getExtractData);
	}
}