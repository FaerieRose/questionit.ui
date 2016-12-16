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

	getTestTemplateMetaById(id: number): Observable<TestTemplate> {
		this.currentUrl = this.testTemplateUrl + "/" + id + "/meta";
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
	}

	removeTestTemplate(testTemplateId: number) {
		//To do
	}

	getTestTemplatesMeta(): Observable<TestTemplate[]> {
		this.currentUrl = this.testTemplateUrl + "/meta";
		console.log(this.currentUrl);
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
	}

	postNewTestTemplate(testTemplate: TestTemplate): Observable<TestTemplate> {
	console.log(" we zitten nu in de postNewTestTemplate");
		let template: TestTemplate = new TestTemplate();
		template = testTemplate;
		this.currentUrl = this.testTemplateUrl;
		let jsonResult: string = JSON.stringify(template);
		console.log("---- JSON(TestTemplate) = " + jsonResult);
		return this.http.post(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractData);
	}
}