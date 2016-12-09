import { NgModule }            from '@angular/core';


import { InstructorComponent }            from './instructor.component';
import { InstructorsComponent }           from './instructors.component';
import { BindInstructorToClassComponent } from './bindinstructortoclass.component';
import { InstructorRoutingModule }        from './instructor-routing.module';

@NgModule({
  imports: [ InstructorRoutingModule ],
  declarations: [
    InstructorComponent, 
    InstructorsComponent, 
    BindInstructorToClassComponent
  ]
})
export class InstructorModule { }
