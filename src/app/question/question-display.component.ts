import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'question-display',
  template: `
    <p #qstn [innerHTML]="_q"></p>
  `
})
export class QuestionDisplayComponent {
  @ViewChild("qstn") qstn;
  _q: string = 'test';
  pElement: HTMLParagraphElement;

  @Input() 
  set q(q: string) {
    this._q = q;
    if(this.pElement != null) {
      let timer = Observable.timer(500);
      timer.subscribe(t => {
        this.updateCSS();
      });
    }
  }
  get q() {
    return this._q;
  }


  ngAfterViewInit() {
    this.pElement = this.qstn.nativeElement;
    this.updateCSS();
  }

  updateCSS() {
    console.log("childElementCount=" + this.pElement.childElementCount);
    for (let i=0; i<this.pElement.children.length ; i++) {
      let chld = this.pElement.children[i];
      console.log(i + " - tagName = " + chld.tagName);
      if (chld.tagName == "PRE") {
        chld.setAttribute("style","color:red; font-weight:bold;");
      }
    }
  }
}