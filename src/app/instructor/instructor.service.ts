import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Request, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { GlobalService } from '../global.service';
import { Instructor } from './instructor';


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
		console.log("----IN getInstructorById where id = " + id);
		console.log("this.currentUrl = " + this.currentUrl);
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
	}

	getInstructors(): Observable<Instructor[]> {
		this.currentUrl = this.instructorUrl;
		console.log(this.currentUrl);
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
	}
	getInstructorsForClass(instructor: string): Observable<Instructor[]> {
		this.currentUrl = this.instructorUrl;
		console.log(this.currentUrl);
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
	}
	postNewInstructor(instructor: Instructor): Observable<Instructor> {
		let instr: Instructor = new Instructor();
		instr = instructor;
		this.currentUrl = this.instructorUrl;
		let jsonResult: string = JSON.stringify(instr);
		console.log("---- JSON(Instructor) = " + jsonResult);
		return this.http.post(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractData);
	}
	  postInstructorId(instructorId: Number) {
    this.currentUrl = this.instructorUrl;
		let jsonResult: string = JSON.stringify(instructorId);
		console.log("---- JSON(instructorId) = " + jsonResult);
		return this.http.post(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractText);
  }
}



