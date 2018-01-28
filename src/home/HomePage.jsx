import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class HomePage extends React.Component {

    render() {
        return (
            <div>
                Hello, this is the introduction page for my travel planning application.
            </div>
        );
    }
}



function mapStateToProps(state) {
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };