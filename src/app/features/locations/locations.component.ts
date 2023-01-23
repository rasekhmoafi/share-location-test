import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as L from 'leaflet';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

 
  private map: any;
  private marker: any;
  locations: any = [];
  longitude: number | undefined;
  latitude: number | undefined;
  constructor(
    private snack: MatSnackBar,
    
  ) { }

  ngOnInit(): void {
    this.initMap()
    this.getUserLocation();    
    this.getLocations();    
  }


  getLocations() {

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
    this.map = L.map('map', {
      center: [  23.35353, 53.2565 ],
      zoom: 12
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
      this.locations.forEach((element: any) => {
        console.log(element);
        
        var marker = L.marker([element.salon_location[0], element.salon_location[1]]).addTo(this.map).bindTooltip(element.max_discount_percent + "% تخفیف").openTooltip();
        marker.on("click", () => {
          this.openInstantDetail(element)
        });
      });
  }

  openInstantDetail(element: any) {
    // this._bottomSheet.open(InstantDiscountDetailComponent, {
    //   data: [element.salon_location[0],element.salon_location[1]]
    // });
  }

}
