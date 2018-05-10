import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { poiData } from '../poi'

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import List, { ListItemAvatar, ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import ReactStars from 'react-stars'
import { placeService } from '../../services/google/place.service';
import Modal from 'material-ui/Modal';
import {warnings} from '../warnings'

import Avatar from 'material-ui/Avatar';
import FolderIcon from 'material-ui-icons/Folder';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
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
        maxWidth: '100%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
});

class PlaceModal extends React.Component {
    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.isOpen,
            modalCity: nextProps.city,
        })
    }
    handleClose() {
        this.setState({ open: false });
    };
    async getPlaceDetails(placeid) {
        var details = await placeService.placeDetails(placeid);
        this.setState({
            photoRef: details.photos[0].photo_reference,
        })
        console.log(details);
    }
    constructor(props) {
        super(props);
        this.state = {
            open: props.isOpen,
            modalCity: props.city,
            photoRef: 'CmRaAAAA7-yyj9gGYiM5t6lstBoRoEAFuuRk_t4gVHY-beJINksukyF9LSI-cPaAWj-FHUPq7oCrLQx5Z6Qeak9aRnXe3BJs3LjtoGjyMoGrqboXbr4xYH6i4DRe3meYq3lalLJkEhDOLtKLn67jEn3_sK585EUKGhTD0W77aRG4NgYnuzrhzUCJmeposg',
            placeName: props.city,
            placeDescription: 'Hong Kong is an autonomous territory, and former British colony, in southeastern China. Its vibrant, densely populated urban centre is a major port and global financial hub with a skyscraper-studded skyline. Central (the business district) features architectural landmarks like I.M. Pei’s Bank of China Tower. Hong Kong is also a major shopping destination, famed for bespoke tailors and Temple Street Night Market.',


        }
        this.handleClose = this.handleClose.bind(this)
        console.log("asd");
    }
    render() {
        const { classes } = this.props;
        return (
            <Modal aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={this.handleClose}>

                <div style={getModalStyle()} className={classes.paper}>
                    <Grid container spacing={24} style={{ height: '100%' }}>
                        <Grid item xs={4}>
                            <Paper >
                                <div style={{ padding: 10 }}>
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.media}
                                            image={placeService.placePhoto(this.state.photoRef)}
                                            title="Contemplative Reptile"
                                        />
                                    </Card>
                                    <Typography gutterBottom variant="display2">
                                        {this.state.placeName}
                                    </Typography>
                                    <Typography gutterBottom variant="headline">
                                        {this.state.placeDescription}
                                    </Typography>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.scrollbar} >
                                <List>
                                    {poiData.results.map((data, index) =>
                                        <ListItem onClick={() => this.getPlaceDetails(data.place_id)}>
                                            <Grid item xs={8}>{data.name}</Grid>
                                            <Grid item xs={3}><ReactStars edit={false} value={data.rating} count={5} size={24} color2={'#ffd700'} /> </Grid>
                                            <Grid item xs={1}>{data.rating}</Grid>
                                        </ListItem>
                                    )}
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper >
                                <List>
                                    {warnings.map((data, index) =>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <FolderIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={data.name}
                                            />
                                        </ListItem>
                                    )}
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Modal>
        )
    }
}


function mapStateToProps(state) {
    return {
    }
}

PlaceModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

const connectedPlaceModal = withStyles(styles)(connect(mapStateToProps)(PlaceModal));
export { connectedPlaceModal as PlaceModal };