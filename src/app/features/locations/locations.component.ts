import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as L from 'leaflet';
import { LocationService } from 'src/app/core/services/location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {


  private map: any = undefined;
  private marker: any;
  locations: any = [];
  longitude: number | undefined;
  latitude: number | undefined;
  constructor(
    private snack: MatSnackBar,
    private locationService: LocationService
  ) { }

  ngOnInit(): void {

    // this.getUserLocation();
    this.getLocations();
  }


  getLocations() {
    this.locationService.getAllLocations().subscribe(res => {
      this.locations = res;
      this.initMap()
    })
  }

  getUserLocation(): void{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          this.longitude = position.coords.longitude;
          this.latitude = position.coords.latitude;
          console.log(this.latitude, this.longitude);
        });
    } else {
       console.log("No support for geolocation")
       this.snack.open('No support for geolocation', 'OK', {
        duration: 4000,
      });
    }
  }


  private initMap(): void {
    if (this.map != undefined) {
      this.map = undefined
    }
    this.map = L.map('main-map', {
      center: [  23.35353, 53.2565 ],
      zoom: 8
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 4,
      attribution: ''
    });
    tiles.addTo(this.map);
    this.addMarker();
  }

  private addMarker(): void {
      this.locations?.forEach((element: any) => {
        var marker = L.marker([element.latitude, element.longtitude]).addTo(this.map)
        marker.on("click", () => {
          var popup = L.popup()
          .setLatLng([element.latitude, element.longtitude])
          .setContent(`
            <div>
              <div style="background-color: #438bc9;">
                <h5 style="color: white; margin-left: 10px; margin-right: 10px"> Location Details </h5>
              </div>
              <div style="border: solid #438bc9 1px">
                <h5>Name: ${element.name}</h5>
                <h5>Type: ${element.type}</h5>
              </div>
            </div>
          `)
          .openOn(this.map);
        });
      });
  }

}
