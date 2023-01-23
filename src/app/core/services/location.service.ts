import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locations = new BehaviorSubject<Location[]>([]);
  
  constructor() { }

  getAllLocations() {
    return [
      {
        latitude: '23.01',
        longtitude: '53.01'
      },
      {
        latitude: '23.02',
        longtitude: '53.02'
      },
      {
        latitude: '23.03',
        longtitude: '53.03'
      },
    ]
  }
  addLocation(location: Location) {
    this.locations.subscribe(val => {
      const newLoc = [...val, location];
      this.locations.next(newLoc);
    })
  }
}
