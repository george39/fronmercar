import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ABARROTES_ROUTES } from './abarrotes.routing';
import { AceiteComponent } from './aceite.component';




@NgModule({
  declarations: [AceiteComponent],
  imports: [
    CommonModule,
    ABARROTES_ROUTES
  ]
})
export class AbarrotesModule { }
