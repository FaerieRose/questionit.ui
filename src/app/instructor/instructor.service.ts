import { Injectable }  from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Request, RequestMethod }  from '@angular/http';

import { Observable }              from 'rxjs/Observable';

import { GlobalService }           from '../global.service';
import { Instructor }         from './instructor';


@Injectable()
export class InstructorService {
	private headers = new Headers({ 'Content-Type': 'application/json' });

	private instructorUrl: string;
	private currentUrl: string;

  constructor(private http: Http, private globalService: GlobalService) {
    this.instructorUrl = this.globalService.getBaseUrl() + 'instructors';
  }

  getInstructorById(id: number): Observable<Instructor> {
    this.currentUrl = this.instructorUrl + "/" + id;
    return this.http.get(this.currentUrl).map(this.globalService.getExtractData);
  }
}