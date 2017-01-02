/* ----------------------------------------------------------------------------------- */
/* Author       : Rik & Rémond                                                         */
/* Date created : 15 Nov 2016                                                          */
/* ----------------------------------------------------------------------------------- */

import { Attempt }                from '../attempt/attempt';


export class Student {
  id?: number;
  attempts: Attempt[];
  firstName: string;
  lastName: string;
  email: string;
  valid: boolean;
  //id: string;
}