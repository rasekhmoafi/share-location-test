import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'locations',
    pathMatch: 'full',
  },
  {
    path: 'locations',
    loadChildren: () => import('./features/locations/locations-routing.module').then(m => m.LocationsRoutingModule)
  },
  {
    path: 'share-location',
    loadChildren: () => import('./features/share-location/share-location-routing.module').then(m => m.ShareLocationRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
