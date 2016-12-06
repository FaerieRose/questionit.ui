import { Injectable } from '@angular/core';
import { StudentClass } from './studentclass';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Request, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { GlobalService } from '../global.service';
@Injectable()


export class StudentClassService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private studentClass: StudentClass;

    private studentclassUrl: string;
    private currentUrl: string;
    private studentClassList: StudentClass[];
    constructor(private http: Http, private globalService: GlobalService) {
        this.studentclassUrl = this.globalService.getBaseUrl() + 'studentclasses';

    }
    ngOnInit() {

        this.getStudentClasses().subscribe(studentClasses => {
            this.studentClassList = studentClasses;
        });
    }

    postInstructorToStudentClass(studentClassID: number, instructorId: number) {
        console.log("in de postInstructorToStudentClass met studentClassID : " + studentClassID + " en met instructorId : "+ instructorId)
        this.currentUrl = this.studentclassUrl + "/" + studentClassID + "/instructor/" + instructorId;
        let jsonResult: string = "{}";
        console.log("---- JSON(StudentClass) = " + jsonResult);
        return this.http.post(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractVoid);
    }

    
    postStudentToStudentClass(studentClassID: number, studentId: number) {
        console.log("in de postStudentToStudentClass met studentClassID : " + studentClassID + " en met studentId : "+ studentId)
        this.currentUrl = this.studentclassUrl + "/" + studentClassID + "/student/" + studentId;
        let jsonResult: string = "{}";
        console.log("---- JSON(StudentClass) = " + jsonResult);
        return this.http.post(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractVoid);
    }



    getStudentClassById(id: number): Observable<StudentClass> {
        console.log(" we zitten nu in de getStudentClassById met id " + id);
        this.currentUrl = this.studentclassUrl + "/" + id;
        console.log("this.currentUrl = " + this.currentUrl);
        return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
    }

    getClassesForInstructors(classes: string): Observable<StudentClass[]> {
        console.log(" we zitten nu in de getClassesForInstructors");
        this.currentUrl = this.studentclassUrl;
        console.log(this.currentUrl);
        return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
    }

    getStudentClasses(): Observable<StudentClass[]> {
        console.log(" we zitten nu in de getStudentClasses");
        this.currentUrl = this.studentclassUrl;
        console.log(this.currentUrl);
        return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
    }

    postNewStudentclass(studentClass: StudentClass): Observable<StudentClass> {
        console.log(" we zitten nu in de postNewStudentclass");
        let studcl: StudentClass = new StudentClass();
        studcl = studentClass;
        this.currentUrl = this.studentclassUrl;
        let jsonResult: string = JSON.stringify(studcl);
        console.log("---- JSON(StudentClass) = " + jsonResult);
        return this.http.post(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractData);
    }
  
//   updateLastName($event) { this.instructor.lastName = $event.target.value; }
//   updateEmail($event) { this.instructor.email = $event.target.value; }
//   updatevalid($event) { this.instructor.valid = $event.target.value; }

    // getStudentClasses(studentClass: string): Observable<StudentClass[]> {
    // 	this.currentUrl = this.studentclassUrl;
    // 	console.log(this.currentUrl);
    // 	return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
    // }
}