/* ----------------------------------------------------------------------------------- */
/* Author       : Dave Schellekens                                                     */
/* Date created : 09-12-2016                                                           */ 
/* ----------------------------------------------------------------------------------- */

import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Request, RequestMethod }  from '@angular/http';

import { Observable }              from 'rxjs/Observable';

import { GlobalService }           from '../global.service';
import { Attempt }                 from './attempt';
import { Question } 							 from '../question/question'; 

@Injectable()
export class AttemptService {
	private headers = new Headers({ 'Content-Type': 'application/json' });

	private attemptUrl: string;
	private currentUrl: string;

  constructor(private http: Http, private globalService: GlobalService) {
		this.attemptUrl = this.globalService.getBaseUrl() + "attempts";
		console.log("Attempt base url: " + this.attemptUrl);
	}

  getAttempt(id: number): Observable<Attempt> {
		this.currentUrl = this.attemptUrl + "/" + id;
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
  }

  getScoresList(id: number): Observable<Boolean[]> {
		this.currentUrl = this.attemptUrl + "/" + id + "/scoresList";
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
  }

  getScoresRate(id: number): Observable<number> {
		this.currentUrl = this.attemptUrl + "/" + id + "/scoresRate";
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
  }

  postNewAttempt(testTemplateId: number, studentId: number): Observable<number> {
		this.currentUrl = this.attemptUrl + "/start/" + testTemplateId + "/" + studentId;
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
  }

	getQuestion(attemptId: number, questionNr: number): Observable<Question> {
		this.currentUrl = this.attemptUrl + "/" + attemptId + "/question/" + questionNr;
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
	}

  getCorrectAnswers(id: number): Observable<String[]> {
		this.currentUrl = this.attemptUrl + "/" + id + "/correctAnswers";
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
  }

  getGivenAnswers(id: number): Observable<String[]> {
		this.currentUrl = this.attemptUrl + "/" + id + "/givenAnswersList";
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
  }

  getReviewIncorrectChoices(id: number): Observable<number[]> {
		this.currentUrl = this.attemptUrl + "/" + id + "/review";
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
  }

  getMarkedQuestions(id: number): Observable<number[]> {
		this.currentUrl = this.attemptUrl + "/" + id + "/markedQuestions";
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
  }

}