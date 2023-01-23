import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-share-location',
  templateUrl: './share-location.component.html',
  styleUrls: ['./share-location.component.scss']
})
export class ShareLocationComponent implements OnInit {
  private map: any;
  private marker: any;
  longitude: number | undefined;
  latitude: number | undefined;

  constructor() { }

  ngOnInit(): void {
    this.initMap()
  }


  private initMap(): void {
    this.map = L.map('map', {
      center: [  23.35353, 53.2565 ],
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
      console.log(e.latlng);
      this.latitude = e.latlng.lat;
        this.longitude = e.latlng.lng;
        this.marker = L.marker([this.latitude!, this.longitude!]).addTo(this.map);
    });
  }

}
