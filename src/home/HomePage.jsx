import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile } from 'material-ui/GridList';
import {tileData} from './data'

//var cities = tileData;
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        overflow:scroll,
        height: '88vh',
    },
    subheader: {
        width: '100%',
    },
});

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function process(cities){

    let x=5;
    let arr = [];
    let random = 0;
    while (x != 0){
        while(true){
            random = getRandomInt(0, 17);
            if(!arr.includes(random)){
                break;
            }
        }
        cities[random].cols =getRandomInt(2,3);
        x--;
    }
    return cities;
}


class HomePage extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        const { classes } = this.props;
        const cities = shuffle(tileData).slice(0,18);
        process(cities);
        return (
            <div>
                <GridList cellHeight={160} className={classes.gridList} cols={8}>
                    {cities.map(data => (
                        <GridListTile key={data.city} cols={data.cols || 1}>
                            <img src={require('../assets/images/'+data.city+'.jpg')} alt={data.city} />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const connectedHomePage = withStyles(styles)(connect(mapStateToProps)(HomePage));
export { connectedHomePage as HomePage };