import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import { tileData } from './data';
import InfoIcon from 'material-ui-icons/Info';
import Modal from 'material-ui/Modal';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import {poiData} from './poi'
import List, { ListItemAvatar,  ListItemIcon, ListItem, ListItemText } from 'material-ui/List';
import ReactStars from 'react-stars'
import { placeService } from '../services/google/place.service';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

import {PlaceModal} from './components/PlaceModal'

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
        overflow: scroll,
        height: '88vh',
    },
    subheader: {
        width: '100%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    zoom: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        '-webkit-transform': 'scale(1)',
        '-webkit-transition': '.3s ease-in-out',
        '-webkit-backface-visibility': 'hidden',
        '&:hover': {
            '-webkit-transform': 'scale(1.3)',
        }
    },
    paper: {
        position: 'absolute',
        width: '97%',
        height: '83%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    scrollbar: {
        overflowY: 'scroll',
        maxHeight: '100%',
        '&::-webkit-scrollbar': {
          width: 10,
          backgroundColor: '#F5F5F5',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: 10,
          WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
          backgroundColor: '#3f51b5',
        },
        '&::-webkit-scrollbar-track': {
          WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
          borderRadius: 10,
          backgroundColor: '#F5F5F5',
        }
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
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

function process(cities) {

    let x = 5;
    let arr = [];
    let random = 0;
    while (x != 0) {
        while (true) {
            random = getRandomInt(0, 17);
            if (!arr.includes(random)) {
                break;
            }
        }
        cities[random].cols = getRandomInt(1, 2);
        x--;
    }
    return cities;
}

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

class HomePage extends React.Component {

    getPlaceDetails(placeid){
        console.log(placeService.placeDetails(placeid));
    }
    showCityDetail(city) {
        this.setState({
            open: true,
            modalCity: city
        })
    }
    handleOpen() {
        this.setState({ open: true });
    };



    constructor(props) {
        super(props);
        var cities = shuffle(tileData).slice(0, 20);
        process(cities);
        this.state = {
            cities: cities,
            open: true,
            modalCity: 'Hong Kong',
        }
        this.showCityDetail = this.showCityDetail.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.getPlaceDetails = this.getPlaceDetails.bind(this);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridList cellHeight={160} className={classes.gridList} cols={8}>
                    {this.state.cities.map((data, index) => (
                        <GridListTile onClick={() => this.showCityDetail(data.city)} key={data.city} cols={data.cols || 1} >
                            <img className={classes.zoom} src={require('../assets/images/' + data.city + '.jpg')} alt={data.city} />
                            <GridListTileBar
                                title={data.city}
                                actionIcon={
                                    <IconButton className={classes.icon}>
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
                <PlaceModal isOpen={this.state.open} city={this.state.modalCity}/>
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