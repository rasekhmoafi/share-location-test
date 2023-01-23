import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareLocationComponent } from './share-location.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ShareLocationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShareLocationRoutingModule { }
