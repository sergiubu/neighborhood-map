import React, { Component } from 'react'

export default class Sidenav extends Component {
  state = {
    query: ''
  }
  
  render() {

    const { searchLocations, markers } = this.props;

    return (
      <div id="nav">
        <h5 id="title">Locations</h5>
        <input type="text" placeholder="Search by name"
               id="input"
               onChange={searchLocations}
        />
        <ul id="locations">
          {markers.map((marker, index) => {
            return (<li key={index}
                        id="list-items"
                        onClick={this.props.openInfoWindow.bind(this, marker)}
                        value={this.state.query}
                        >
                       {marker.title}
                    </li>)
          })}
        </ul>
      </div>
    )
  }
}
