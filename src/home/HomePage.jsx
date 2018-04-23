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
import List, { ListItem, ListItemText } from 'material-ui/List';
import ReactStars from 'react-stars'
import { placeService } from '../services/google/place.service';

console.log(poiData)
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
    showCityDetail(index) {
        this.handleOpen();
    }
    handleOpen() {
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false });
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
        this.handleClose = this.handleClose.bind(this);
        this.getPlaceDetails = this.getPlaceDetails.bind(this);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridList cellHeight={160} className={classes.gridList} cols={8}>
                    {this.state.cities.map((data, index) => (
                        <GridListTile onClick={() => this.showCityDetail(index)} key={data.city} cols={data.cols || 1} >
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
                <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={this.state.open} onClose={this.handleClose}>
                    <div style={getModalStyle()} className={classes.paper}>

                        <Grid container spacing={24} style={{height:'100%'}}>
                            <Grid item xs={4}>
                                <Paper >
                                    <div style={{padding:10}}>
                                    <img src={require('../assets/images/' + this.state.modalCity + '.jpg')} alt={this.state.modalCity} />
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.scrollbar} >
                                <List>
                                {poiData.results.map((data, index)=>
                                    <ListItem onClick={()=>this.getPlaceDetails(data.place_id)}> 
                                        <Grid item xs={8}>{data.name}</Grid> 
                                        <Grid item xs={3}><ReactStars edit={false} value={data.rating} count={5} size={24} color2={'#ffd700'} /> </Grid>
                                        <Grid item xs={1}>{data.rating}</Grid>
                                    </ListItem>
                                    )}
                                </List>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper >Coutry / City Disaster Graph/ seasonal ; annual tourism arrival; criminal rate/safety</Paper>
                            </Grid>

                        </Grid>
                    </div>
                </Modal>

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