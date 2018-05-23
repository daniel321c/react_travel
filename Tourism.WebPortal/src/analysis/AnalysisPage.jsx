import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';
import Modal from 'material-ui/Modal';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import List, { ListItemAvatar, ListItemIcon, ListItem, ListItemText } from 'material-ui/List';
import ReactStars from 'react-stars'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FolderIcon from 'material-ui-icons/Folder';

import { poiData } from './poi'
import { tileData } from './data';
import { warnings } from './warnings'
import { placeService } from '../services/google/place.service';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
    paper: {
        boxShadow: theme.shadows[6],
        margin: 10,
    },
    card: {
        maxWidth: '100%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
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
    tooltip:{
        fontSize: 15,

    },
    popper:{
        width:'30%'
    }
});


class AnalysisPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalCity: 'Hong Kong',
            photoRef: 'CmRaAAAA7-yyj9gGYiM5t6lstBoRoEAFuuRk_t4gVHY-beJINksukyF9LSI-cPaAWj-FHUPq7oCrLQx5Z6Qeak9aRnXe3BJs3LjtoGjyMoGrqboXbr4xYH6i4DRe3meYq3lalLJkEhDOLtKLn67jEn3_sK585EUKGhTD0W77aRG4NgYnuzrhzUCJmeposg',
            placeName: 'Hong Kong',
            placeDescription: 'Hong Kong is an autonomous territory, and former British colony, in southeastern China. Its vibrant, densely populated urban centre is a major port and global financial hub with a skyscraper-studded skyline. Central (the business district) features architectural landmarks like I.M. Pei’s Bank of China Tower. Hong Kong is also a major shopping destination, famed for bespoke tailors and Temple Street Night Market.',
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div >
                <GridList cols={6} className={classes.scrollbar} >
                    <GridListTile cols={2} rows={3} className={classes.paper}>
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
                    </GridListTile>


                    <GridListTile cols={2} rows={3} className={classes.paper}>
                        <div style={{ textAlign: 'center' }}>
                            <Typography gutterBottom variant="headline">
                                Things to Do
                            </Typography>
                        </div>
                        <div className={classes.scrollbar} style={{maxHeight:'95%'}}>
                            <List>
                                {poiData.results.map((data, index) =>
                                    <ListItem onClick={() => this.getPlaceDetails(data.place_id)}>
                                        <Grid item xs={7}>{data.name}</Grid>
                                        <Grid item xs={4}><ReactStars edit={false} value={data.rating} count={5} size={20} color2={'#ffd700'} /> </Grid>
                                        <Grid item xs={1}>{data.rating}</Grid>
                                    </ListItem>
                                )}
                            </List>
                        </div>
                    </GridListTile>

                    <GridListTile cols={1.5} rows={3} className={classes.paper}>
                        <div >
                            <div style={{ textAlign: 'center' }}>
                                <Typography gutterBottom variant="headline">
                                    Warnings & Dangers
                                </Typography>
                            </div>
                            <List>
                                {warnings.map((data, index) =>

                                    <Tooltip id="tooltip-bottom" classes={{tooltip: classes.tooltip, popper: classes.popper}}title={data.comment} placement="bottom">
                                        <ListItem>
                                            <Grid item xs={2}>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <FolderIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <ListItemText
                                                    primary={data.name}
                                                />
                                            </Grid>
                                            <Grid item xs={2}>
                                                <ListItemText
                                                    primary={data.value}
                                                />
                                            </Grid>
                                        </ListItem>
                                    </Tooltip>
                                )}
                            </List>
                        </div>
                    </GridListTile>
                </GridList>
            </div >
        );
    }
}



function mapStateToProps(state) {
    return {
    }
}

AnalysisPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const connectedAnalysisPage = withStyles(styles)(connect(mapStateToProps)(AnalysisPage));
export { connectedAnalysisPage as AnalysisPage };