/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 10 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */

import { EnumLanguages } from '../enums'; 
import { EnumExams }     from '../enums'; 
import { AnswerList }    from '../answerlist/answerlist';

export class Question {
  id? : number;
  name : string;
  programmingLanguage: EnumLanguages;
  forExam: EnumExams;
  question: string;
  explanationAnswer: string;
  typeOfQuestion: string;
  creator: any;
  correctAnswers: AnswerList;
  givenAnswers: any[];
  possibleAnswers: string[];
  isEnabled: boolean;
  //isObsolete: boolean;
  numberOfCorrectAnswers: number; // Added by Bas 2016-12-09
}