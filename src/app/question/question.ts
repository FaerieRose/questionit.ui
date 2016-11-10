/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 10 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import '../enums';

export class Question {
  id? : number;
  name : string;
  programmingLanguage: EnumLanguages;
  forExam: EnumExams;
  question: string;
  explantionAnswer: string;
  typeOfQuestion: string;
}