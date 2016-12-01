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

    postInstructorToStudentClass(studentClass: StudentClass, selectedInstructorId: number): Observable<StudentClass> {
        this.currentUrl = this.studentclassUrl + "/" + studentClass.id + "/instructor/" + selectedInstructorId;
        let jsonResult: string = "{}";
        console.log("---- JSON(StudentClass) = " + jsonResult);
        return this.http.post(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractData);
    }



    getStudentClassById(id: number): Observable<StudentClass> {
        this.currentUrl = this.studentclassUrl; + "/" + id;
        //this.currentUrl = "http://localhost:8081/api/studentclasses";
        return this.http.get(this.currentUrl).map(this.globalService.getExtractData);

    }

    getClassesForInstructors(classes: string): Observable<StudentClass[]> {
        this.currentUrl = this.studentclassUrl;
        console.log(this.currentUrl);
        return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
    }

    getStudentClasses(): Observable<StudentClass[]> {
        this.currentUrl = this.studentclassUrl;
        console.log(this.currentUrl);
        return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
    }

    postNewStudentclass(studentClass: StudentClass): Observable<StudentClass> {
        let studcl: StudentClass = new StudentClass();
        studcl = studentClass;
        this.currentUrl = this.studentclassUrl;
        let jsonResult: string = JSON.stringify(studcl);
        console.log("---- JSON(StudentClass) = " + jsonResult);
        return this.http.post(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractData);
    }

    // getStudentClasses(studentClass: string): Observable<StudentClass[]> {
    // 	this.currentUrl = this.studentclassUrl;
    // 	console.log(this.currentUrl);
    // 	return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
    // }
}