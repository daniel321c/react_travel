import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Chip from 'material-ui/Chip';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Input from 'material-ui/Input';
import update from 'immutability-helper';

let plan = {

  points: [
    {
      name: 'Tokyo International Airport',
      location: {
        lat: 35.5493932,
        lng: 139.7798386
      }
    },
    {
      name: 'Tokyo Tower',
      location: {
        lat: 35.6585805,
        lng: 139.7454329
      }
    },
    {
      name: 'Meiji Shrine',
      location: {
        lat: 35.6763976,
        lng: 139.6993259
      }
    },
    {
      name: 'Tokyo Disneyland',
      location: {
        lat: 35.6328964,
        lng: 139.8803943
      }
    },
    {
      name: 'Grand Hyatt Tokyo',
      location: {
        lat: 35.659426,
        lng: 139.729104
      }
    },
    {
      name: 'Tokyo Skytree',
      location: {
        lat: 35.7100630,
        lng: 139.8107000
      }
    },
    {
      name: 'Sensō-ji',
      location: {
        lat: 35.7147650,
        lng: 139.7966550139
      }
    },
    {
      name: 'Tokyo Marriott Hotel',
      location: {
        lat: 35.6209750,
        lng: 139.7374410
      }
    },
    {
      name: 'Narita International Airport',
      location: {
        lat: 35.7719870,
        lng: 140.3928500
      }
    }
  ],
  trip: [
    {
      dayNum: 1,
      origin: 'Tokyo International Airport',
      destination: 'Grand Hyatt Tokyo',
      middlePoints: ['Tokyo Tower', 'Meiji Shrine', 'Tokyo Disneyland'],
      points: ['Tokyo International Airport', 'Tokyo Tower', 'Meiji Shrine', 'Tokyo Disneyland', 'Grand Hyatt Tokyo'],
      waypoints: [
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
      ],
    },
    {
      dayNum: 2,
      origin: 'Grand Hyatt Tokyo',
      destination: 'Tokyo Marriott Hotel',
      middlePoints: ['Tokyo Skytree', 'Sensō-ji'],
      points: ['Grand Hyatt Tokyo', 'Tokyo Skytree', 'Sensō-ji', 'Tokyo Marriott Hotel'],
      waypoints: [
        {
          location: 'Tokyo Skytree',
          stopover: true
        },
        {
          location: 'Sensō-ji',
          stopover: true
        }
      ],
    },
    {
      dayNum: 3,
      origin: 'Tokyo Marriott Hotel',
      destination: 'Narita International Airport',
      middlePoints: [],
      waypoints: [],
    }
  ]
}

const styles = theme => ({
  root: {
    width: '40%',
    float: 'left',
    height: '100%',
  },
  panel: {
    width: '100%',
    height: '95%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.3%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  transitbar: {
    height: 58,
    width: 2,
    margin: 0,
    border: 'none',
    flexShrink: 0,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  scrollbar: {
    overflowY: 'scroll',
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

class DetailedExpansionPanel extends React.Component {
  componentWillReceiveProps(nextProps) {
    var point = nextProps.newPoint;
    var selected = this.state.select;
    if (point == null || selected == null) return;

    if (point.type == 'Origin') {
      this.setState(
        update(this.state, {
          trip: {
            [selected]:{
            origin: {
              $set: point.point.name
            }
          }
          }
  }))

}else if (point.type == 'Destination') {

} else {

}
  }
expandOrCollapse(index) {
  let x = this.state.expanded.slice();
  x[index] = !x[index];
  this.setState({
    expanded: x,
  })
}

addNewDay() {
  var day = {
    dayNum: this.state.trip.length + 1,
    origin: '',
    destination: '',
    middlePoints: [],
    waypoints: [],
  };
  this.setState(
    update(this.state,
      { trip: { $push: [day] } }
    )
  )
}

deleteDay(index){
  var state = update(this.state,
    { trip: { $splice: [[index, 1]] } }
  );
  this.setState(state)
  this.props.setPlan(
    {
      points: [],
      trip: state.trip,
    }
  )
}
selectDay(index){
  this.setState({
    select: index,
  })
}
save(){

}
edit(){

}
cancel(){

}
deletePlan(){

}
constructor(props) {
  super(props);
  this.props.setPlan(plan);
  this.state = {
    expanded: new Array(plan.trip.length).fill(true),
    trip: plan.trip,
    select: null
  }
  this.expandOrCollapse = this.expandOrCollapse.bind(this);
  this.addNewDay = this.addNewDay.bind(this);
  this.deleteDay = this.deleteDay.bind(this);
  this.selectDay = this.selectDay.bind(this);
}

render() {
  const { classes } = this.props;
  const { trip } = this.state
  return (
    <div className={classes.root}>
      <div className={[classes.panel, classes.scrollbar].join(' ')}>


        {trip.map((day, index) =>
          <ExpansionPanel key={index} expanded={this.state.expanded[index]}  >
            <ExpansionPanelSummary onClick={() => this.expandOrCollapse(index)} expandIcon={<ExpandMoreIcon />}>
              <div className={classes.column}>
                <Typography className={classes.heading}>Day {index + 1}</Typography>
              </div>
            </ExpansionPanelSummary>


            <ExpansionPanelDetails className={classes.details}>
              <div className={classes.column}>


                <Chip label={day.origin} className={classes.chip} onDelete={() => { }} /><hr className={classes.transitbar} />

                {day.middlePoints.map((point, index) => <div key={index}> <Chip label={point} className={classes.chip} onDelete={() => { }} /><hr className={classes.transitbar} /></div>)}

                <Chip label={day.destination} className={classes.chip} onDelete={() => { }} />


              </div>
              <div className={classNames(classes.column, classes.helper)}>
                <Typography variant="caption">
                  Select your destination of choice<br />
                  <a href="#sub-labels-and-columns" className={classes.link}>
                    Learn more
                    </a>
                </Typography>
              </div>
            </ExpansionPanelDetails>
            <Button onClick={() => this.deleteDay(index)}>Delete</Button>
            <Button onClick={() => this.selectDay(index)}>{this.state.select == index ? 'Selected' : 'Select'}</Button>
          </ExpansionPanel>
        )}
      </div>
      <div>
        <Button variant="raised" color="primary">Edit</Button>
        <Button size="medium">Cancel</Button>
        <Button size="large" color="primary">Save</Button>
        <Button onClick={this.addNewDay}> New Day</Button>
      </div>
    </div>
  )
}
}

DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DetailedExpansionPanel);