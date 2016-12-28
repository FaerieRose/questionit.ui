/* ----------------------------------------------------------------------------------- */
/* Author       : FaerieRose                                                           */
/* Date created : 09 Dec 2016                                                          */
/* ----------------------------------------------------------------------------------- */
import { NgModule }     from '@angular/core';
import { Routes,
         RouterModule } from '@angular/router';

import { InstructorComponent }            from './instructor.component';
import { InstructorsComponent }           from './instructors.component';
import { BindInstructorToClassComponent } from './bindinstructortoclass.component';
import { InstructorLandingComponent }           from './instructor-landing.component';

const routes: Routes = [
  { path: '', redirectTo: 'edit', pathMatch: 'full'},         //waarom default naar edit?
  { path: 'edit', component: InstructorComponent },
  { path: 'list', component: InstructorsComponent },
  { path: 'bind', component: BindInstructorToClassComponent },
  { path: 'landing', component: InstructorLandingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule {}
