/* ----------------------------------------------------------------------------------- */
/* Author       : Rik & Rémond                                                         */
/* Date created : 15 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */
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
		console.log(" we zitten nu in de getInstructorById met id " + id);
		this.currentUrl = this.instructorUrl + "/" + id;
		console.log("this.currentUrl = " + this.currentUrl);
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
	}

	getInstructors(): Observable<Instructor[]> {
		console.log(" we zitten nu in de getInstructors");
		this.currentUrl = this.instructorUrl;
		console.log(this.currentUrl);
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
	}
	getInstructorsForClass(instructor: string): Observable<Instructor[]> {
		console.log(" we zitten nu in de getInstructorsForClass");
		this.currentUrl = this.instructorUrl;
		console.log(this.currentUrl);
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
	}

	removeInstructor(instructorId: number) {
		console.log("in de removeStudent in INSTRUCTOR met instructorId : " + instructorId)
		this.currentUrl = this.instructorUrl + "/removeinstructor/" + instructorId;
		let jsonResult: string = "{}";
		console.log("---- JSON(Instructor) = " + jsonResult);
		return this.http.post(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractVoid);

	}
	postNewInstructor(instructor: Instructor): Observable<Instructor> {
		console.log(" we zitten nu in de postNewInstructor");
		let instr: Instructor = new Instructor();
		instr = instructor;
		this.currentUrl = this.instructorUrl;
		let jsonResult: string = JSON.stringify(instr);
		console.log("---- JSON(Instructor) = " + jsonResult);
		return this.http.post(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractData);
	}
	postInstructorId(instructorId: Number) {
		console.log(" we zitten nu in de postInstructorId");
		this.currentUrl = this.instructorUrl;
		let jsonResult: string = JSON.stringify(instructorId);
		console.log("---- JSON(instructorId) = " + jsonResult);
		return this.http.post(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractText);
	}


}



