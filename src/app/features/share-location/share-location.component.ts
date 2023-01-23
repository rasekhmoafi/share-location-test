import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as L from 'leaflet';
import { LocationService } from 'src/app/core/services/location.service';


@Component({
  selector: 'app-share-location',
  templateUrl: './share-location.component.html',
  styleUrls: ['./share-location.component.scss']
})
export class ShareLocationComponent implements OnInit {
  private map: any = undefined;
  private marker: any;
  longitude: number | undefined;
  latitude: number | undefined;
  name: string | undefined;
  type: string | undefined;
  url: string | undefined;

  constructor(
    private locationService: LocationService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initMap()
  }

  private initMap(): void {
    if (this.map != undefined) {
      this.map = undefined
    }
    this.map = L.map('share-map', {
      center: [ 23.35353, 53.2565 ],
      zoom: 6,
      zoomControl: false
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 4,
      attribution: ''
    });
    tiles.addTo(this.map);
    this.map.on('click', (e :any) => {
      if(this.marker) {
        this.map.removeLayer(this.marker)
      }
      this.latitude = e.latlng.lat;
      this.longitude = e.latlng.lng;
      this.marker = L.marker([this.latitude!, this.longitude!]).addTo(this.map);
    });
  }

  shareLocation() {
    if(this.name && this.latitude && this.longitude) {
      const newLocation = {
        latitude: this.latitude?.toString(),
        longtitude: this.longitude?.toString(),
        name: this.name,
        type: this.type,
        url: this.url
      }
      this.locationService.addLocation(newLocation)
    }
    else {
      this.snack.open("Not enough data", "OK", {
        duration: 4000
      })
    }
  }



}
