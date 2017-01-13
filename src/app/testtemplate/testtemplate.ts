/**
 * Author: Dave Schellekens
 * Date created: 09-12-2016 * 
 *   
 * 
*/

import { Question }    from '../question/question';
import { EnumLanguages } from '../enums'; 
import { EnumExams }     from '../enums';

export class TestTemplate {
    id? : number;
    name : string;
    programmingLanguage: EnumLanguages;
    forExam: EnumExams;
    //creator: any;
    enabled: boolean;
    questions: Question[];
    attemptTimeInMinutes: number;
    //size: number;
}