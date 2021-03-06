/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 10 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */

import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Request, RequestMethod }  from '@angular/http';

import { Observable }              from 'rxjs/Observable';

import { GlobalService }           from '../global.service';
import { Question }                from './question';

import { EnumLanguages }   from '../enums'; 
import { EnumExams }       from '../enums'; 

@Injectable()
export class QuestionService {
	private headers = new Headers({ 'Content-Type': 'application/json' });

	private questionUrl: string;
	private currentUrl: string;

  	constructor(private http: Http, private globalService: GlobalService) {
		this.questionUrl = this.globalService.getBaseUrl() + "questions";
		console.log("Question base url: " + this.questionUrl);
	}

	// -------------------------------------------------------------
	// GET one question with specific id
	getQuestion(id) : Observable<Question>{
		this.currentUrl = this.questionUrl + "/" + id + "/basic";
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
	}

	// -------------------------------------------------------------
	// GET one question exam style with specific id
	getQuestionExam(id) : Observable<Question>{
		this.currentUrl = this.questionUrl + "/" + id + "/exam";
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
	}

	// -------------------------------------------------------------
	// GET one question exam style with specific id
	getQuestions(exam: string, lang: string, enabled: boolean) : Observable<Question[]>{
		this.currentUrl = this.questionUrl + "/select/" + exam + "/" + lang + "/" + enabled;
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
	}

	// -------------------------------------------------------------
	// GET levels for programming languiage
	getLevels(lang: string) {
		this.currentUrl = this.questionUrl + "/" + lang;
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
	}

	// -------------------------------------------------------------
	// POST a question
	// backend returns the id of the question
	postQuestion(question: Question, correctAnswersId: number) : Observable<number> {
		this.currentUrl = this.questionUrl + "/creator/" + this.globalService.getInstructorID() + "/correct-answers/" + correctAnswersId;
		let qstn: Question = new Question();
		qstn = question;
		qstn.correctAnswers = undefined;
		qstn.givenAnswers = undefined;
		qstn.creator = undefined;
		let jsonResult: string = JSON.stringify(qstn);
		console.log("---- JSON(Question) = " + jsonResult);
		return this.http.post(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractData);
	}

}
