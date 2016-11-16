import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'question-display',
  template: `
    <p #qstn></p>
  `
})
export class QuestionDisplayComponent {
  @ViewChild("qstn") qstn;
  pElement: HTMLParagraphElement;
//  q: string = "Is the following statement correct?<br><pre>  for (int a = 0; a < 10; a++)<br>    a = a * a;<br>  }</pre>";
  @Input() q: string;

  ngAfterViewInit() {
    this.pElement = this.qstn.nativeElement;
    this.pElement.innerHTML = this.q;
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