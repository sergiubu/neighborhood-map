import React, { Component } from 'react'
import Map from './components/Map'
import Sidenav from './components/Sidenav'
import { locations } from './components/Data'
import './App.css'
/* global google */

export default class App extends Component {

  state = {
    map: '',
    markers: [],
    searchedMarkers: [],
    infowindow: '',
    isOpen: true
  }

  componentDidMount() {
    window.initMap = this.initMap;
    window.gm_authFailure = this.gm_authFailure;

    loadMapJS('https://maps.googleapis.com/maps/api/js?&key=AIzaSyB8BKW9-aUTTHXeSHIadm60hjH-h04FD4o&v=3&callback=initMap')
  }

  // Initialize map
  initMap = () => {
    const mapContainer = document.getElementById('map');
    const map = new window.google.maps.Map(mapContainer, {
      center: { lat:  40.78306, lng: -73.971249},
      zoom: 13,
      mapTypeControl: false
    });
    this.setState({ map });

    // Empty array for markers
    let markersArr = [];
    // Define map bounds for panning
    let bounds = new google.maps.LatLngBounds();

    // Add markers to map
    locations.forEach(location => {
      let marker = new google.maps.Marker({
        map: map,
        position: location.coords,
        title: location.name,
        animation: google.maps.Animation.DROP
      })

      // Add click listener for opening info window
      marker.addListener('click', _ => {
        this.openInfoWindow(marker);
      })
      // Add marker to the empty array
      markersArr.push(marker);

      // Extend bounds based on location
      let locations = new google.maps.LatLng(
        marker.position.lat(),
        marker.position.lng()
      )
      bounds.extend(locations)
    })
    
    this.setState({ markers: markersArr, searchedMarkers: markersArr })
    
    // Get current center
    let currentCenter = map.getCenter();
    // Add event listener for resize and reset the window
    google.maps.event.addDomListener(window, 'resize', _ => {
      this.state.map.setCenter(currentCenter);
      this.state.map.fitBounds(bounds);
      this.state.map.panToBounds(bounds);
    })

    // Create new info window and set it's state
    let infowindow = new google.maps.InfoWindow({});
    this.setState({ infowindow })
  }
  
  gm_authFailure() {
    window.alert('Google Maps error')
  }

  openInfoWindow = (marker) => {
    // Set map center to marker position
    this.state.map.setCenter(marker.getPosition());

    // Get details from Foursquare API
    const clientId = 'K5ABHWWI2EU5B2OTF1M5UNN4PRLMZERRPHOH00UEWG0FD5F4';
    const clientSecret = 'AHEEHW0TLMUNM2O0HF1RGH2JV0JBVAKKT35Q35YPX5RVW4AP';
    
    let lat = marker.getPosition().lat();
    let lng = marker.getPosition().lng();
    
    const url = `https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${clientSecret}&v=20180712&ll=${lat},${lng}`;

    this.state.infowindow.setContent('Loading Information...')
    fetch(url)
      .then((res) => {
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
                  .then((data) => {
                    let info = data.response.venue;
                    let viewMore = '<a href="https://foursquare.com/v/'+ info.id +'"target="_blank"><b>View More</b></a><br>';
                    // Setting the content of the marker
                    this.state.infowindow.setContent(`Foursquare says: <br>Number of Tips: ${info.tips.count}<br>Number of Likes: ${info.likes.count} <br> ${viewMore}`)
                  })
              })
              .catch(function (err) {
                console.log('[Foursquare error]', err);
                alert('Sorry, Foursquare API limit has been exceeded for the day.');
              });
          })
      })
      .catch(function (err){
        console.log('[Foursquare error]', err);
        alert('Sorry, Foursquare API limit has been exceeded for the day.');
      });

    this.state.infowindow.open(this.state.map, marker);
    
    // Timeout for marker animation
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    setTimeout(_ => {
      marker.setAnimation(null);
    }, 1500);
  }

  // Filter input locations
  searchLocations = (event) => {
    this.state.infowindow.close();

    let searchedLocations = [];

    if (event.target.value === '' || searchedLocations.length === 0) {
      this.state.searchedMarkers.forEach((marker) => {
        if (marker.title.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0) {
          marker.setVisible(true);
          searchedLocations.push(marker);
        } else {
          marker.setVisible(false);
        }
      });
    } else {
      this.state.markers.forEach((marker) => {
        if (marker.title.toLowerCase().indexOf(event.target.value) >= 0) {
          marker.setVisible(true);
          searchedLocations.push(marker);
        } else {
          marker.setVisible(false);
        }
      });
    }
    this.setState({ markers: searchedLocations })
  }
  
  toggleNav = () => {
    document.getElementById('nav').classList.toggle('close');
    if (document.getElementById('nav').className === 'close') {
      this.setState({
        isOpen: false
      })
    }
    this.state.infowindow.close();
  }
  
  render() {
    return (
      <div className="App" role="main">
      <span id="toggle-nav" onClick={this.toggleNav} aria-label="toggle navigation">&#9776;</span>
        <Sidenav
          isOpen = {this.props.isOpen}
          markers= {this.state.markers}
          openInfoWindow = {this.openInfoWindow}
          searchLocations = {this.searchLocations}
        />
        <Map />
      </div>
    );
  }
}

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
