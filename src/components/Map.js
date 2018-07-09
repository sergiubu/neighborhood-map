import React, { Component } from 'react'
import ScriptLoader from 'react-async-script-loader'
import { locations } from './Data'

class Map extends Component {
  state = {
    map: {},
    markers: []
  }

  // Check if the map loads successfully
  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    if(isScriptLoaded && !this.props.isScriptLoaded) {
      if (isScriptLoadSucceed) {
        console.log('Map loaded successfully');
        const gMap = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat:  40.78306, lng: -73.971249},
          zoom: 13
        });
        this.setState({ map: gMap });
      } else {
        console.log('Map loading error');
        this.props.onError();
      }
    }
  }

  displayMarkers = (locations) => {
    let marker;
    locations.map(location => {
      marker = new window.google.maps.Marker({
        map: this.state.map,
        position: location.coords,
        title: location.name,
        animation: window.google.maps.Animation.DROP
      })
      console.log('[display mark]', location.name);
      this.state.markers.push(marker);
    })
  }

  componentDidUpdate() {
    this.displayMarkers(locations);
  }

  render() {
    return (
      <div id="map" className="map-container"></div>
    )
  }
}

export default ScriptLoader(
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyB8BKW9-aUTTHXeSHIadm60hjH-h04FD4o&v=3'
)(Map)
