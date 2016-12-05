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

	getStudents(): Observable<Student[]> {
		this.currentUrl = this.studentUrl;
		console.log(this.currentUrl);
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
	}

	postNewStudent(student: Student): Observable<Student> {
		console.log(" we zitten nu in de postNewStudent");
		//	this.currentUrl = this.studentUrl + "/creator/1/correct-answers/" + correctAnswersId;
		// this.currentUrl = this.studentUrl + "/student/";
		let stud: Student = new Student();
		stud = student;
		this.currentUrl = this.studentUrl;
		// this.currentUrl = "http://localhost:8081/api/students";
		let jsonResult: string = JSON.stringify(stud);
		console.log("---- JSON(Student) = " + jsonResult + " met currentUrl =:" + this.currentUrl);
		return this.http.post(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractData);


		//.map(this.globalService.getExtractData);
	}
}