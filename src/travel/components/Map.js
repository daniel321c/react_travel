import React from "react"
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer, InfoWindow } from "react-google-maps"
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox'
import FaAnchor from 'react-icons/lib/fa/anchor'
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

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
        componentWillMount() {
            const DirectionsService = new google.maps.DirectionsService();
            const refs = {};
            this.setState({
                directions: [],
                bounds: null,
                center: {
                    lat: 35.5494, lng: 139.7798
                },
                markers: [],
                directionMarkers: [],
                isInfoWinOpen: false,
                infoWinIndex: null,
                searchInfoWinIndex: null,
                customMarkerImg: new google.maps.MarkerImage(
                    require('../../assets/images/marker.png'),
                    new google.maps.Size(71, 71),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(25, 45),
                    new google.maps.Size(50, 50)
                ),
                onMapMounted: ref => {
                    refs.map = ref;
                },
                onBoundsChanged: () => {
                    this.setState({
                        bounds: refs.map.getBounds(),
                        center: refs.map.getCenter(),
                    })
                },
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    const bounds = new google.maps.LatLngBounds();

                    places.forEach(place => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport)
                        } else {
                            bounds.extend(place.geometry.location)
                        }
                    });
                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location,
                    }));
                    const nextCenter = { lat: nextMarkers[0].position.lat(), lng: nextMarkers[0].position.lng() }
                    this.setState({
                        center: nextCenter,
                        markers: nextMarkers,
                    });
                    // refs.map.fitBounds(bounds);
                },
                onToggleOpen: (index) => {

                    if (this.state.searchInfoWinIndex != null) {
                        this.setState({
                            isInfoWinOpen: true,
                            infoWinIndex: index,
                            searchInfoWinIndex: null,
                        })
                    } else {
                        if (this.state.infoWinIndex == index) {
                            this.setState({
                                isInfoWinOpen: !this.state.isInfoWinOpen,
                            })
                        } else {
                            this.setState({
                                isInfoWinOpen: true,
                                infoWinIndex: index,
                            })
                        }
                    }
                },
                searchInfoWinOpen: (index) => {
                    if (this.state.infoWinIndex != null) {
                        this.setState({
                            isInfoWinOpen: true,
                            infoWinIndex: null,
                            searchInfoWinIndex: index,
                        })
                    } else {
                        if (this.state.searchInfoWinIndex == index) {
                            this.setState({
                                isInfoWinOpen: !this.state.isInfoWinOpen,
                            })
                        } else {
                            this.setState({
                                isInfoWinOpen: true,
                                searchInfoWinIndex: index,
                            })
                        }
                    }
                }
            })
            this.props.Plan.trip.map(day =>
                DirectionsService.route({
                    origin: day.origin,
                    destination: day.destination,
                    waypoints: day.waypoints,
                    travelMode: google.maps.TravelMode.DRIVING
                }, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        this.setState({
                            directions: [...this.state.directions, result],
                        });
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                })
            )
        }
    })
)(props =>
    <GoogleMap
        ref={props.onMapMounted}
        defaultZoom={18}
        center={props.center}
        onBoundsChanged={props.onBoundsChanged}
    >
        <SearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            controlPosition={google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={props.onPlacesChanged}
        >
            <input
                type="text"
                placeholder="Search"
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    marginTop: `12px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                }}
            />
        </SearchBox>
        {props.markers.map((marker, index) =>
            <Marker key={index} position={marker.position} onClick={() => props.searchInfoWinOpen(index)}>
                {index == props.searchInfoWinIndex && props.isInfoWinOpen && <InfoWindow onCloseClick={props.onToggleOpen}><FaAnchor /></InfoWindow>}
            </Marker>)
        }


        {props.Plan.points.map((point, index) =>
            <Marker icon={props.customMarkerImg} key={index} position={point.location} onClick={() => props.onToggleOpen(index)}>
                {index == props.infoWinIndex && props.isInfoWinOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
                    <Typography >{point.name}</Typography></InfoWindow>}
            </Marker>)
        }
        {props.directions.map((direction, index) => <DirectionsRenderer key={index} options={{ suppressMarkers: true, polylineOptions: { strokeColor: getRandomColor() } }} directions={direction} />)}
    </GoogleMap>
    )

export default MyMapComponent
