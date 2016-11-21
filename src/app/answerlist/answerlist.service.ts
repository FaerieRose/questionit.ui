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
import { AnswerList }                from './answerlist';

@Injectable()
export class AnswerListService {
	private headers = new Headers({ 'Content-Type': 'application/json' });

	private answerListUrl: string;
	private currentUrl: string;

  constructor(private http: Http, private globalService: GlobalService) {
		this.answerListUrl = this.globalService.getBaseUrl() + "answers";
		console.log("AnswerList base url: " + this.answerListUrl);
	}

  getAnswerList(id: number): Observable<AnswerList> {
		this.currentUrl = this.answerListUrl + "/" + id;
		return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
  }

  postAnswerList(answerList: AnswerList) {
    this.currentUrl = this.answerListUrl;
		let jsonResult: string = JSON.stringify(answerList);
		console.log("---- JSON(AnswerList) = " + jsonResult);
		return this.http.post(this.currentUrl, jsonResult, { headers: this.headers }).map(this.globalService.getExtractText);
  }

}