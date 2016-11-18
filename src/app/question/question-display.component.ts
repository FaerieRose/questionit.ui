/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 16 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */

import { Component, ViewChild } from '@angular/core';
import { Input, AfterViewInit } from '@angular/core';
import {Observable}             from 'rxjs/Rx';

@Component({
  selector: 'question-display',
  template: '<p #qstn [innerHTML]="_question"></p>'
})
export class QuestionDisplayComponent {
  _question: string = 'test';
  pElement: HTMLParagraphElement;

  @ViewChild("qstn") qstn;
  @Input() 
  set question(question: string) {
    this._question = question;
    // During initialisation the pElement has not yet been created
    if(this.pElement != null) {
      // Wait for the update of pElement before updating the CSS
      let timer = Observable.timer(500);
      timer.subscribe(t => {
        this.updateCSS();
      });
    }
  }
  get question() {
    return this._question;
  }

  // After the View has been initialised connect #qstn to pElement and update the CSS
  ngAfterViewInit() {
    this.pElement = this.qstn.nativeElement;
    this.updateCSS();
  }

  // Update the CSS of the question
  updateCSS() {
    for (let i=0; i<this.pElement.children.length ; i++) {
      let chld = this.pElement.children[i];
      console.log(i + " - tagName = " + chld.tagName);
      if (chld.tagName == "PRE") {
        chld.setAttribute("style","color:red; font-weight:bold;");
      }
    }
  }
}