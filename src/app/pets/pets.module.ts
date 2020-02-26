import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PetsRoutingModule } from './pets-routing.module';
import { PetsListComponent } from './pets-list/pets-list.component';
import { SharedModule } from '../shared/shared.module';
import { PetsFormComponent } from './pets-form/pets-form.component';



@NgModule({
  declarations: [PetsListComponent, PetsFormComponent],
  imports: [
    CommonModule,
    PetsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class PetsModule { }
