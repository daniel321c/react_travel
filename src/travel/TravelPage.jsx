import React from "react"
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import { connect } from 'react-redux';
import Itinerary from './components/Itinerary'

const locations = [
  {
    location: 'Tokyo Tower',
    stopover: true
  },
  {
    location: 'Meiji Shrine',
    stopover: true
  },
  {
    location: 'Tokyo Disneyland',
    stopover: true
  }
]

const origin = 'Tokyo International Airport (Haneda Airport) (HND), 3 Chome Hanedakuko, Ota City, Tokyo, Japan'

const destination = 'Grand Hyatt Tokyo'

let trip = [
  {
    day: 1,
    origin: "",
    destination: "",
    waypoints: [],
  },
  {
    day: 2,
    origin: "",
    destination: "",
    waypoints: [],
  },
  {
    day: 3,
    origin: "",
    destination: "",
    waypoints: [],
  }
]


const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAbFWCJYlKzVOrEesawE0X3qpcHaDpFHqI&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ float: 'right', width: '45%', height: '100%' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route({
        origin: origin,
        destination: destination,
        waypoints: locations,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={18}
    defaultCenter={{ lat: 35.5494, lng: 139.7798 }}
  >
    {props.directions && <DirectionsRenderer directions={props.directions}/> }
  </GoogleMap>
  )

class TravelPage extends React.PureComponent {

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker() {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick() {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: false,
    }

  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <Itinerary />
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
        />
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