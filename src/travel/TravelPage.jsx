import React from "react"
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import { connect } from 'react-redux';
import Itinerary from './components/Itinerary'
import Map from './components/Map'


class TravelPage extends React.PureComponent {

  setTrip(trip){
    this.setState(
      {
        trip: trip,
      }
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      trip: [],
    }
    this.setTrip = this.setTrip.bind(this);
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <Itinerary setTrip = {this.setTrip} />
        <Map Trip = {this.state.trip}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  };
}

const connectedTravelPage = connect(mapStateToProps)(TravelPage);
export { connectedTravelPage as TravelPage }; 