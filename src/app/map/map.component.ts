import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  coords = new Array();

  constructor() { }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    
    const map = new mapboxgl.Map({
      container: 'mapElem',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-79.7879, 40.4351], //40.435178,-79.7879
      zoom: 13
    });

    const geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-79.76297378540039, 40.439957696512884]
          },
          properties: {
            title: 'Mapbox',
            description: 'Starbucks McMasters'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-79.8108497, 40.4292883]
          },
          properties: {
            title: 'Mapbox',
            description: 'Starbucks Penn Center'
          }
        }
      ]
    };

    // add markers to map
    for (const feature of geojson.features) {
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = 'url("/assets/images/mapbox-icon.png")';
      el.style.width = '18px';
      el.style.height = '18px';
      el.style.backgroundColor = 'green';
      el.style.borderRadius = "50%";
      let coord1 = feature.geometry.coordinates[0];
      let coord2 = feature.geometry.coordinates[1];
      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el).setLngLat([coord1, coord2]).addTo(map);

      new mapboxgl.Marker(el)
        .setLngLat([coord1, coord2])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
            )
        )
        .addTo(map);
    }

    

  }

}
