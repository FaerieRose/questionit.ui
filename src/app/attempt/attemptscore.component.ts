/* ----------------------------------------------------------------------------------- */
/* Author       : Dave Schellekens , S.Martens                                         */
/* Date created : 09 Dec 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute, Params ,Router } from '@angular/router';
import { Attempt }                 from './attempt';
import { AttemptService }        from '../attempt/attempt.service';

@Component({
  selector: 'my-attemptscore',
  templateUrl: 'attemptscore.component.html',
  styleUrls: [ 'attempt.component.css' ],
  providers: [ AttemptService ]
})

export class AttemptScoreComponent implements OnInit {
  visibleId : number;
  scoresList : Boolean[];
  scoresRate : number;
  correctAnswers : String[];
  givenAnswers : String[]

  attempt: Attempt;
  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private attemptService  : AttemptService,
  ) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    console.log(id);
    // this.getAttempt(id); 
    this.getScoresList(id);
    this.getScoresRate(id);
    this.getCorrectAnswers(id);
    this.getGivenAnswers(id);
    this.visibleId = id;

  }

  getAttempt(id) {
    this.attemptService.getAttempt(id).subscribe(attempt => {
      this.attempt = attempt;
      // console.log(this.attempt.id);
      }); 
  }

  getScoresList(id) {
    this.attemptService.getScoresList(id).subscribe(scoresList => {
      this.scoresList = scoresList;
      // console.log(this.scoresList);
      }); 
  }

  getScoresRate(id) {
    this.attemptService.getScoresRate(id).subscribe(scoresRate => {
      this.scoresRate = scoresRate;
      // console.log(this.getScoresRate);
      }); 
  }

   getCorrectAnswers(id) {
    this.attemptService.getCorrectAnswers(id).subscribe(correctAnswers => {
      this.correctAnswers = correctAnswers;
      // console.log(this.getCorrectAnswers);
      }); 
  }

   getGivenAnswers(id) {
    this.attemptService.getGivenAnswers(id).subscribe(givenAnswers => {
      this.givenAnswers = givenAnswers;
      // console.log(this.getGivenAnswers);
      }); 
  }

    studentReview(id) : void{
      this.router.navigate(['studentreview']);
    }

}