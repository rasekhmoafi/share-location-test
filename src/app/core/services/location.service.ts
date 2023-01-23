import { Injectable } from '@angular/core';
import { latLng } from 'leaflet';
import { BehaviorSubject, first } from 'rxjs';
import { Location } from '../models/location.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private _localStorage: Storage;
  private _locations$ = new BehaviorSubject<Location[]>([]);
  public locations$ = this._locations$.asObservable();
  
  constructor(
    private localStorageService: LocalStorageService
  ) { 
    this._localStorage = localStorageService.localStorage;
  }

  getAllLocations() {
    const locations = JSON.parse(this._localStorage.getItem('locations')!)
    this._locations$.next(locations)
    return this._locations$;
  }
  addLocation(newLocation: Location) {

    this.locations$.pipe(first()).subscribe(val => {
      const newLocations = [...val, newLocation];
      console.log(newLocations);
      
      this._locations$.next(newLocations);
      this._localStorage.setItem('locations', JSON.stringify(newLocations))
    })
  }
}
