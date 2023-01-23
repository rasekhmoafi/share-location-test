import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
    private localStorageService: LocalStorageService,
    private router: Router,
    private snack: MatSnackBar
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
      this.snack.open("Added Successfully!", "OK", {
        duration: 4000
      })
      setTimeout(() => {
        this.router.navigate(['/locations'])
      }, 1000);
    })
  }
}
