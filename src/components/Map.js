import React, { Component } from 'react'
import { locations } from './Data'

class Map extends Component {

  componentDidMount() {
    window.initMap = this.initMap;

    loadMapJS('https://maps.googleapis.com/maps/api/js?&key=AIzaSyB8BKW9-aUTTHXeSHIadm60hjH-h04FD4o&v=3&callback=initMap')
  }

  // Initialize map
  initMap = () => {
    const mapContainer = document.getElementById('map');
    const map = new window.google.maps.Map(mapContainer, {
      center: { lat:  40.78306, lng: -73.971249},
      zoom: 13
    });
    this.props.setMap(map);
    
    // Add markers to map
		locations.forEach(location => {
			let marker = new window.google.maps.Marker({
				map: map,
				position: location.coords,
				title: location.name,
				animation: window.google.maps.Animation.DROP
      });
      
      let infoWindow = new window.google.maps.InfoWindow({
        content: location.name
      });
      
      marker.addListener('click', _ => {
        this.props.setInfoWindow(infoWindow);
        this.props.openInfoWindow(marker);
        
        //this.props.closeInfoWindow();
        console.log('INFOwindow', infoWindow);
      });
		});
  }

  render() {
    return (
      <div id="map" className="map-container"></div>
    )
  }
}

export default Map;

function loadMapJS(src) {
  let ref = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  script.onerror = function () {
      document.write('Google Maps can\'t be loaded');
  };
  ref.parentNode.insertBefore(script, ref);
}
