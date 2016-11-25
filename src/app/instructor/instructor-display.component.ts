/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 16 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */

import { Component, ViewChild } from '@angular/core';
import { Input, AfterViewInit } from '@angular/core';
import {Observable}             from 'rxjs/Rx';

@Component({
  selector: 'instructor-display',
  template: '<p #qstn [innerHTML]="_instructor"></p>'
})
export class InstructorDisplayComponent {
  _instructor: string = 'test';
  pElement: HTMLParagraphElement;

  @ViewChild("qstn") qstn;
  @Input() 
  set instructor(instructor: string) {
    this._instructor = instructor;
    // During initialisation the pElement has not yet been created
    if(this.pElement != null) {
      // Wait for the update of pElement before updating the CSS
      let timer = Observable.timer(500);
      timer.subscribe(t => {
        this.updateCSS();
      });
    }
  }
  get instructor() {
    return this._instructor;
  }

  // After the View has been initialised connect #qstn to pElement and update the CSS
  ngAfterViewInit() {
    this.pElement = this.qstn.nativeElement;
    this.updateCSS();
  }

  // Update the CSS of the instructor
  updateCSS() {
    for (let i=0; i<this.pElement.children.length ; i++) {
      let chld = this.pElement.children[i];
      if (chld.tagName == "PRE") {
        chld.setAttribute("style","color:red; font-weight:bold;");
      }
    }
  }
}