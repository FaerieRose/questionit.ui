import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Request, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { GlobalService } from '../global.service';
import { TestTemplate } from './testtemplate';


@Injectable()
export class TestTemplateService {
	private headers = new Headers({ 'Content-Type': 'application/json' });

	private testTemplateUrl: string;
	private currentUrl: string;

	constructor(private http: Http, private globalService: GlobalService) {
		this.testTemplateUrl = this.globalService.getBaseUrl() + 'testtemplates';
	}

	getTestTemplateById(id: number): Observable<TestTemplate> {
		this.currentUrl = this.testTemplateUrl + "/" + id;
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
	}

	removeTestTemplate(testTemplateId: number) {
		//To do
	}

	getTestTemplates(): Observable<TestTemplate[]> {
		this.currentUrl = this.testTemplateUrl;
		console.log(this.currentUrl);
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
	}

	postNewTestTemplate(testTemplate: TestTemplate): Observable<TestTemplate> {
		//To do
		return null;
	}
}