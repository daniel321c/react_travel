import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class HomePage extends React.Component {
    constructor(props) {
        super(props); 
    }
    render() {
        return (
            <div>
                Hello, this is Home Page
            </div>
        );
    }
}



function mapStateToProps(state) {
    return{
        
    }
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };