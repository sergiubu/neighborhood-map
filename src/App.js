import React, { Component } from 'react'
import Map from './components/Map'
import './App.css'

export default class App extends Component {

  state = {
    map: ''
  }

  setMap = map => {
    this.setState({ map })
  }

  render() {
    return (
      <div className="App">
        <Map
          setMap={this.setMap}
        />
      </div>
    );
  }
}
