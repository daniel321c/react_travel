import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createHashHistory } from 'history';
const history = createHashHistory();
// import { alertActions } from '../_actions';
import { PrivateRoute } from './components';
import { HomePage } from './home';
import { LoginPage } from './login';
import { RegisterPage } from './register';
import { TravelPage } from './travel';
import {AnalysisPage} from './analysis';


import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';


import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import BeachAccessIcon from 'material-ui-icons/BeachAccess'
import HomeIcon from 'material-ui-icons/Home'
import LogoutIcon from 'material-ui-icons/ExitToApp'
import LoginIcon from 'material-ui-icons/AccountBox'
import BusinessCenterIcon from 'material-ui-icons/BusinessCenter'

import RegisterIcon from 'material-ui-icons/GroupAdd'

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        //marginTop: theme.spacing.unit * 3,
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'appBarShift-left': {
        marginLeft: drawerWidth,
    },
    'appBarShift-right': {
        marginRight: drawerWidth,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: 'calc(100% - 56px)',
        marginTop: 56,
        marginRight: -20,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 45,
        },
    },
    'content-left': {
        marginLeft: -drawerWidth,
    },
    'content-right': {
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    },
    'contentShift-right': {
        marginRight: 0,
    },
});

class App extends React.Component {

    handleDrawerOpen() {
        this.setState({ open: true });
    };

    handleDrawerClose() {
        this.setState({ open: false });
    };

    handleChangeAnchor(event) {
        this.setState({
            anchor: event.target.value,
        });
    };

    logout() {
        localStorage.removeItem('user');
        history.push('/');
    }

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchor: 'left',
        };
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleChangeAnchor = this.handleChangeAnchor.bind(this)
        this.logout = this.logout.bind(this)
        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            // dispatch(alertActions.clear());
        });
    }

    render() {
        // const { alert } = this.props;
        const { classes, theme } = this.props;
        const { anchor, open } = this.state;

        const mailFolderListItems = (
            <Router>
                <div>
                    <ListItem component={Link} to="/" button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary='Home' />
                    </ListItem>
                    <ListItem component={Link} to="/Travel" button>
                        <ListItemIcon>
                            <BeachAccessIcon />
                        </ListItemIcon>
                        <ListItemText primary='Travel' />
                    </ListItem>
                    <ListItem component={Link} to="/Analysis" button>
                        <ListItemIcon>
                            <BusinessCenterIcon />
                        </ListItemIcon>
                        <ListItemText primary='Analysis' />
                    </ListItem>
                    <ListItem component={Link} to="/Login" button>
                        <ListItemIcon>
                            <LoginIcon />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                    </ListItem>
                    <ListItem component={Link} to="/Register" button>
                        <ListItemIcon>
                            <RegisterIcon />
                        </ListItemIcon>
                        <ListItemText primary="Register" />
                    </ListItem>
                    <ListItem onClick={this.logout} button>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>

                </div></Router>
        );

        const drawer = (
            <Drawer
                variant="persistent"
                anchor={anchor}
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List className={classes.list}>{mailFolderListItems}</List>
                <Divider />
            </Drawer>
        );
        return (

            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: open,
                            [classes[`appBarShift-${anchor}`]]: open,
                        })}
                    >
                        <Toolbar disableGutters={!open}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="headline" type="title" color="inherit" noWrap>
                                Tourism Application
                                </Typography>
                        </Toolbar>
                    </AppBar>
                    {drawer}
                    <main
                        className={classNames(classes.content, classes[`content-${anchor}`], {
                            [classes.contentShift]: open,
                            [classes[`contentShift-${anchor}`]]: open,
                        })}
                    >

                        <Router>
                            <Switch>
                                <Route exact path="/" component={HomePage} />
                                <Route exact path="/Travel" component={TravelPage} />
                                <Route exact path='/Login' component={LoginPage} />
                                <Route exact path="/Register" component={RegisterPage} />
                                <Route exact path="/Analysis" component={AnalysisPage} />
                            </Switch>
                        </Router>

                    </main>
                </div>
            </div>
        );
    }
}
App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    // const { alert } = state;
    // return {
    //     alert
    // };
    return {};
}

const connectedApp = withStyles(styles, { withTheme: true })(connect(mapStateToProps)(App));
export { connectedApp as App }; 