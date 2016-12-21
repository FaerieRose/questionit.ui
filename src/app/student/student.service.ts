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
import { Student } from './student';


@Injectable()
export class StudentService {
	private headers = new Headers({ 'Content-Type': 'application/json' });

	private studentUrl: string;
	private currentUrl: string;

	constructor(private http: Http, private globalService: GlobalService) {
		this.studentUrl = this.globalService.getBaseUrl() + 'students';
	}

	getStudentById(id: number): Observable<Student> {

		console.log("in de  getStudentById this.currentUrl = " + this.currentUrl);
		this.currentUrl = this.studentUrl + "/" + id;
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
	}

	getStudentsForClass(instructor: string): Observable<Student[]> {
		console.log(" we zitten nu in de getStudentsForClass");
		this.currentUrl = this.studentUrl;
		console.log(this.currentUrl);
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
	}

	removeStudent(studentId: number){
		console.log("in de removeStudent in STUDENT met studentId : "+ studentId)
        this.currentUrl = this.studentUrl + "/removestudent/"+ studentId;
        let jsonResult: string = "{}";
        console.log("---- JSON(Student) = " + jsonResult);
        return this.http.post(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractVoid);

	}

	getStudents(): Observable<Student[]> {
		this.currentUrl = this.studentUrl;
		console.log(this.currentUrl);
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
	}

	postNewStudent(student: Student): Observable<Student> {
		console.log(" we zitten nu in de postNewStudent");
		let stud: Student = new Student();
		stud = student;
		this.currentUrl = this.studentUrl;
		let jsonResult: string = JSON.stringify(stud);
		console.log("---- JSON(Student) = " + jsonResult + " met currentUrl =:" + this.currentUrl);
		return this.http.post(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractData);


	}
}