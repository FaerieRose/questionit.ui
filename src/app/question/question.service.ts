/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 10 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Request, RequestMethod }  from '@angular/http';

import { Observable }              from 'rxjs/Observable';

import { Question }                from './question';

@Injectable()
export class QuestionService {
	private headers = new Headers({ 'Content-Type': 'application/json' });

	private questionUrl: string;
	private currentUrl: string;

  constructor(private http: Http) {
		this.questionUrl = "http://" + window.location.hostname + ":8081/api/questions";
		console.log("Question base url: " + this.questionUrl);
	}

	// -------------------------------------------------------------
	// GET one question with specific id
	getQuestion(id) : Observable<Question>{
		this.currentUrl = this.questionUrl + "/" + id;
		return this.http.get(this.currentUrl).map(this.getExtractData);
	}

	// -------------------------------------------------------------
	// GET one question exam style with specific id
	getQuestionExam(id) : Observable<Question>{
		this.currentUrl = this.questionUrl + "/exam/" + id;
		return this.http.get(this.currentUrl).map(this.getExtractData);
	}

	// -------------------------------------------------------------
	// GET one question exam style with specific id
	getQuestions() : Observable<Question[]>{
		this.currentUrl = this.questionUrl;
		return this.http.get(this.currentUrl).map(this.getExtractData);
	}

	// -------------------------------------------------------------
	// GET one question with specific id
	postNewQuestion(question: Question) : Observable<Question> {
		let jsonQuestion: string = JSON.stringify(question);
		return this.http.post(this.questionUrl, jsonQuestion, { headers: this.headers }).map(this.getExtractData);
	}

	// -------------------------------------------------------------
	// Returns the received JSON data if the response from the GET is 200, otherwise an empty JSON object
	private getExtractData(res: Response) {
		if (res.status == 200) {
			console.error("Response from " + res.url + ": Status: " + res.status);
			return res.json();
		} else {
			console.error("Response from " + res.url + ": Status: " + res.status);
			return {}
		}
  }

}
