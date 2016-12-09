/**
 * Author: Dave Schellekens
 * Date created: 09-12-2016 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
*/

import { AnswerList }    from '../answerlist/answerlist';

//yet to be created
import { TestTemplate }    from '../testtemplate/testtemplate';

export class Attempt {
    id?: number;
    testTemplate: TestTemplate;
    givenAnswers: AnswerList[];
    markedQuestions: number[];
    startDateTime: Date;
    endDateTime: Date;
    timeToCompleteInSeconds: number;
}