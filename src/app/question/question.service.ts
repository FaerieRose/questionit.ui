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

  constructor(private http: Http) {}

	// GET one question with specific id
	getQuestion(id) : Observable<Question>{
		 return this.http.get(this.questionUrl + id).map((res: Response) => res.json());
	}

	// GET one question exam style with specific id
	getQuestionExam(id) : Observable<Question>{
		 return this.http.get(this.questionUrl + "exam/" + id).map((res: Response) => res.json());
	}

}
