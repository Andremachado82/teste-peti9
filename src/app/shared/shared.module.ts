import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormService } from './services/form.service';





@NgModule({
  declarations: [AlertModalComponent],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [AlertModalComponent],
  entryComponents: [AlertModalComponent],
  providers: [ FormService ]
})
export class SharedModule { }
