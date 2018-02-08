import React from "react"
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import { connect } from 'react-redux';
import Itinerary from './components/Itinerary'
import Map from './components/Map'
import Candidate from './components/Candidate'


class TravelPage extends React.PureComponent {

  setPlan(plan){
    this.setState(
      {
        plan: plan,
      }
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      plan: null,
    }
    this.setPlan = this.setPlan.bind(this);
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <Itinerary setPlan = {this.setPlan} />
        <Candidate style={{paddingLeft:10}} />
        <Map Plan = {this.state.plan}/>
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