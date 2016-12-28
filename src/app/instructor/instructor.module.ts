/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 09 Dec 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';

import { InstructorComponent }            from './instructor.component';
import { InstructorsComponent }           from './instructors.component';
import { BindInstructorToClassComponent } from './bindinstructortoclass.component';
import { InstructorLandingComponent }     from './instructor-landing.component'
import { InstructorRoutingModule }        from './instructor-routing.module';

@NgModule({
  imports: [ CommonModule, InstructorRoutingModule ],
  declarations: [
    InstructorComponent, 
    InstructorsComponent, 
    BindInstructorToClassComponent,
    InstructorLandingComponent
  ]
})
export class InstructorModule { }
