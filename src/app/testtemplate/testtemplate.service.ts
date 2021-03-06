import { Injectable } 				from '@angular/core';
import { Http, Response } 			from '@angular/http';
import { Headers, RequestOptions } 	from '@angular/http';
import { Request, RequestMethod } 	from '@angular/http';

import { Observable } 				from 'rxjs/Observable';

import { GlobalService } 			from '../global.service';
import { TestTemplate } 			from './testtemplate';
import { TestTemplateModelBasic } 	from './testtemplatemodelbasic';
import { Question }              	from '../question/question';


@Injectable()
export class TestTemplateService {
	private headers = new Headers({ 'Content-Type': 'application/json' });

	private testTemplateUrl: string;
	private currentUrl: string;

	constructor(private http: Http, private globalService: GlobalService) {
		this.testTemplateUrl = this.globalService.getBaseUrl() + 'testtemplates';
	}

	getTestTemplateById(id: number): Observable<TestTemplateModelBasic> {
		this.currentUrl = this.testTemplateUrl + "/" + id + "/basic";
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
	}

	getTestTemplateMetaById(id: number): Observable<TestTemplateModelBasic> {
		this.currentUrl = this.testTemplateUrl + "/" + id + "/basic";
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
	}

	removeTestTemplate(testTemplateId: number) {
		//To do
	}

	getTestTemplatesMeta(): Observable<TestTemplateModelBasic[]> {
		this.currentUrl = this.testTemplateUrl + "/basic";
		console.log(this.currentUrl);
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
	}

	// made obsolete by putTestTemplateWithQuestions
	//
	// removeQuestionToTemplate(templateId: number, questionId :number): Observable<Question> {
	// 	//TODO: method is erg twijfelachtig. nog niet getest.
	// 	let template: TestTemplate = new TestTemplate();
	// 	console.log("in de removeQuestionToTemplate in templateId : "+ templateId + " en questionId : " + questionId);
    //     this.currentUrl = this.testTemplateUrl +"/"+ templateId + "/removequestionfromtesttemplate/"+ questionId;
	// 	console.log("==============-----------------***-"+this.currentUrl +"----------------=================");
	// 	// console.log( templateId + " currentUrl: " + this.currentUrl)
    //     let jsonResult: string = "{}";
    //     console.log("---- JSON(TestTemplate) = " + jsonResult);
	// 	return this.http.post(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractData);
	// }


	// made obsolete by putTestTemplateWithQuestions
	//
	//addQuestionToTemplate(templateId: number, questionId :number): Observable<Question> {
	// addQuestionToTemplate(templateId: number, questionId :number) {
	// 	let template: TestTemplate = new TestTemplate();
	// 	console.log("in de addQuestionToTemplate in templateId : "+ templateId + " en questionId : " + questionId)

    //     this.currentUrl = this.testTemplateUrl +"/"+ templateId + "/addquestion/"+ questionId;
	// 	console.log( templateId + " currentUrl: " + this.currentUrl)
    //     let jsonResult: string = "{}";
    //     console.log("---- JSON(TestTemplate) = " + jsonResult);
	// 	//console.log(this.http.get(this.testTemplateUrl + "/meta").map(this.globalService.getExtractData));
    //     //return this.http.post(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractData);
	// 	return this.http.post(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractVoid);

	// }

	// made obsolete by putTestTemplateWithQuestions
	//
	// postNewTestTemplate(testTemplate: TestTemplate): Observable<TestTemplate> {
	// 	console.log(" we zitten nu in de postNewTestTemplate");
	// 	let template: TestTemplate = new TestTemplate();
	// 	template = testTemplate;
	// 	this.currentUrl = this.testTemplateUrl;
	// 	let jsonResult: string = JSON.stringify(template);
	// 	console.log("---- JSON(TestTemplate) = " + jsonResult);
	// 	return this.http.post(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractData);
	// }

	putTestTemplateWithQuestions(testTemplate: TestTemplate): Observable<number> {
		console.log(" we zitten nu in de putTestTemplate");
		//this.currentUrl = this.testTemplateUrl;
		let jsonResult: string = JSON.stringify(testTemplate);
		console.log("Will PUT JSON(TestTemplate) " + jsonResult);
		
		return this.http.put(this.testTemplateUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractText);
	}

}