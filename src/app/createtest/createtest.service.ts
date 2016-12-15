/* ----------------------------------------------------------------------------------- */
/* Author       : Rik & Rémond                                                         */
/* Date created : 15 Dec 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Request, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { GlobalService } from '../global.service';
import { CreateTest } from './createtest';


@Injectable()
export class CreateTestService {
	private headers = new Headers({ 'Content-Type': 'application/json' });

	private createTestUrl: string;
	private currentUrl: string;

	constructor(private http: Http, private globalService: GlobalService) {
		this.createTestUrl = this.globalService.getBaseUrl() + 'createtest';
	}

}