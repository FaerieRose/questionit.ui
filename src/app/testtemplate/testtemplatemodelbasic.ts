/**
 * Author: Dave Schellekens
 * Date created: 05-01-2017 * 
 *   
 * 
*/

import { EnumLanguages } from '../enums'; 
import { EnumExams }     from '../enums';

export class TestTemplateModelBasic {
    id? : number;
    attemptTimeInMinutes: number;
    creationDateTime: Date;
    creatorID: number;
    name : string;
    programmingLanguage: EnumLanguages;
    forExam: EnumExams;
    enabled: boolean;
    questionsIds: number[];
    size: number;
}
	
