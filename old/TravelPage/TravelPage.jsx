import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class TravelPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                hello, this is travel planning
            </div>
        );
    }
}


const connectedTravelPage = TravelPage;
export { connectedTravelPage as TravelPage };