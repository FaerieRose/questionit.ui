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
    let attempt_id = +this.route.snapshot.params['id'];
    console.log(attempt_id);
    // this.getAttempt(id); 
    this.getScoresList(attempt_id);
    this.getScoresRate(attempt_id);
    this.getCorrectAnswers(attempt_id);
    this.getGivenAnswers(attempt_id);
    this.visibleId = attempt_id;

  }

  getAttempt(attempt_id) {
    this.attemptService.getAttempt(attempt_id).subscribe(attempt => {
      this.attempt = attempt;
      // console.log(this.attempt.id);
      }); 
  }

  getScoresList(attempt_id) {
    this.attemptService.getScoresList(attempt_id).subscribe(scoresList => {
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

   getCorrectAnswers(attempt_id) {
    this.attemptService.getCorrectAnswers(attempt_id).subscribe(correctAnswers => {
      this.correctAnswers = correctAnswers;
      // console.log(this.getCorrectAnswers);
      }); 
  }

   getGivenAnswers(attempt_id) {
    this.attemptService.getGivenAnswers(attempt_id).subscribe(givenAnswers => {
      this.givenAnswers = givenAnswers;
      // console.log(this.getGivenAnswers);
      }); 
  }

    studentReview(attempt_id) : void{
      this.router.navigate(['studentreview']);
    }

}