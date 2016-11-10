/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 10 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable }              from 'rxjs';

import { Question }                from './question';

@Injectable()
export class QuestionService {
	private headers = new Headers({ 'Content-Type': 'application/json' });
	private options = new RequestOptions({ headers: this.headers });

	private questionUrl = "http://localhost:8081/api/questions/";
	private currentUrl: string;

  constructor(private http: Http) {}

	// -------------------------------------------------------------
	// GET one question with specific id
	getQuestion(id) : Observable<Question>{
		this.currentUrl = this.questionUrl + id;
		return this.http.get(this.currentUrl).map(this.getExtractData);
	}

	// -------------------------------------------------------------
	// GET one question exam style with specific id
	getQuestionExam(id) : Observable<Question>{
		this.currentUrl = this.questionUrl + "exam/" + id;
		return this.http.get(this.currentUrl).map(this.getExtractData);
	}

	// -------------------------------------------------------------
	// Returns the received JSON data if the response from the GET is 200, otherwise an empty JSON object
	private getExtractData(res: Response) {
		if (res.status == 200) {
			return res.json();
		} else {
			console.error("Response from " + res.url + ": Status: " + res.status);
			return {}
		}
  }

}
