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
import { Question }				   from '../question/question';
import { AnswerList }              from '../answerlist/answerlist';
import { TestTemplate }			   from '../testtemplate/testtemplate'


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
		console.log(this.currentUrl);
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
  }

  postNewAttempt(testTemplateId: number, studentId: number): Observable<number> {
		this.currentUrl = this.attemptUrl + "/start/" + testTemplateId + "/" + studentId;
		let jsonResult: string = "{}";
		return this.http.post(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractText);
  }

  getQuestion(attemptId: number, questionNr: number): Observable<Question> {
		this.currentUrl = this.attemptUrl + "/" + attemptId + "/question/" + questionNr;
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
  }

  getCorrectAnswers(id: number): Observable<String[]> {
		this.currentUrl = this.attemptUrl + "/" + id + "/correctAnswers";
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
  }

  putGivenAnswer(attemptID: number, questNR: number, givenAnswer: AnswerList): Observable<number> {
	 /**
	 * PUT answerList from givenAnswers corresponding with number relating to index
	 *  ( number = index + 1 )
	 * Path = 'api/attempts'
	 * @return 200 + JSON if there is data, or 204 (noContent), or 406 "Not Acceptable when number is not corresponding 
	 * @author S.Martens
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("{id}/answerlist/{nr}")
	 */
		this.currentUrl = this.attemptUrl + "/" + attemptID + "/answerlist/" + questNR;
		let jsonResult: string = JSON.stringify(givenAnswer);
		console.log("---- JSON(AnswerList) = " + jsonResult);
		return this.http.put(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractText);
  }

  getGivenAnswer(attemptID: number, questNR: number): Observable<AnswerList> {
	  	this.currentUrl = this.attemptUrl + "/" + attemptID + "/answerlist/" + questNR;
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

  getTesttemplate(attemptID: number): Observable<TestTemplate>{
	  	this.currentUrl = this.attemptUrl + "/" + attemptID + "/TestTemplate";
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
  }

}