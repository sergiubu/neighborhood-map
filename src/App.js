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
    //this.closeInfoWindow();

    this.state.map.setCenter(marker.getPosition());
    const clientId = 'K5ABHWWI2EU5B2OTF1M5UNN4PRLMZERRPHOH00UEWG0FD5F4';
    const clientSecret = 'AHEEHW0TLMUNM2O0HF1RGH2JV0JBVAKKT35Q35YPX5RVW4AP';
    
    let lat = marker.getPosition().lat();
    let lng = marker.getPosition().lng();
    
    const url = `https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${clientSecret}&v=20180712&ll=${lat}, ${lng}`;

    this.state.infowindow.setContent('Loading Information...')
    fetch(url)
      .then((res)=>{
        if (res.status !== 200) {
          this.state.infowindow.setContent('Error retrieving data');
          return;
        }
        res.json()
          .then((data) => {
            // Get the first response
            let json = data.response.venues[0];
            fetch(`https://api.foursquare.com/v2/venues/${json.id}/?client_id=${clientId}&client_secret=${clientSecret}&v=20180712`)
              .then((resp) => {
                resp.json()
                  .then(data=>{
                    let info = data.response.venue;
                    let viewMore = '<a href="https://foursquare.com/v/'+ info.id +'"target="_blank"><b>View More</b></a><br>';
                    // Setting the content of the marker
                    this.state.infowindow.setContent(`Foursquare says: <br>Number of Tips: ${info.tips.count}<br>Number of Likes: ${info.likes.count} <br> ${viewMore}`)
                  })
              })
              .catch(function (err){
                console.log('[Foursquare error]', err);
                alert('Sorry Foursquare API limit has been exceeded for the day');
              });
          })
      })
      .catch(function (err){
        console.log('[Foursquare error]', err);
        alert('Sorry Foursquare API limit has been exceeded for the day');
      });

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
    //this.state.infowindow.close();
    
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
