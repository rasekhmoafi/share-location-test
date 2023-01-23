import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareLocationComponent } from './share-location.component';
import { ShareLocationRoutingModule } from './share-location-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ShareLocationComponent
  ],
  imports: [
    CommonModule,
    ShareLocationRoutingModule,
    SharedModule
  ]
})
export class ShareLocationModule { }
