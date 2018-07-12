import React, { Component } from 'react'
import Map from './components/Map'
import './App.css'

export default class App extends Component {

  state = {
    map: '',
    markers: [],
    clickedMarker: '',
    infowindow: ''
  }

  setMap = (map) => {
    this.setState({ map })
  }

  setMarkers = (marker) => {
    this.setState({ markers: marker })
  }

  filterMarkers = (map) => {
    this.state.markers.forEach(marker => {
      marker.setMap(map)
    })
  }

  setInfoWindow = (infoWindow) => {
    this.setState({ infowindow: infoWindow })
  }

  openInfoWindow = (marker) => {
    // testing
    this.closeInfoWindow();

    this.state.infowindow.open(this.state.map, marker);
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    setTimeout(_ => {
      marker.setAnimation(null);
    }, 1500);
    
    this.setState({ clickedMarker: marker });
    console.log('[clicked marker]', marker);
  }

  closeInfoWindow = () => {
    // testing
    this.state.infowindow.close();
    
    this.setState({ clickedMarker: '' });
  }
  
  render() {
    return (
      <div className="App">
        <Map
          setMap={this.setMap}
          setMarkers={this.setMarkers}
          setInfoWindow={this.setInfoWindow}
          openInfoWindow={this.openInfoWindow}
          closeInfoWindow={this.closeInfoWindow}
          clickedMarker={this.state.clickedMarker}
        />
      </div>
    );
  }
}
