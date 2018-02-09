import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import { DragSource } from 'react-dnd';
import Token from './Token'

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { DropTarget } from 'react-dnd'
import update from 'immutability-helper';

const candidates = [
    {
        name: 'Nakamise',
        position: {
            lat: 35.7118410,
            lng: 139.7964540,
        }
    },
    {
        name: 'Tsukiji Fish Market japan',
        position: {
            lat: 35.6654860,
            lng: 139.7706670
        }
    }
]

const styles = theme => ({
    root: {
        width: '10%',
        float: 'left',
        height: '100%',
        paddingLeft: '1%',
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
});


class Candidate extends React.Component {
    moveToken(dragIndex, hoverIndex) {
        const { candidates } = this.state
        const dragCard = candidates[dragIndex]

        console.log(update(this.state, {
            candidates: {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
            },
        }));
        this.setState(
            update(this.state, {
                candidates: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
                },
            })
        )
    }
    constructor(props) {
        super(props);
        this.state = {
            candidates: [
                {
                    id: 0,
                    name: 'Nakamise',
                    position: {
                        lat: 35.7118410,
                        lng: 139.7964540,
                    }
                },
                {
                    id: 1,
                    name: 'Tsukiji Fish Market japan',
                    position: {
                        lat: 35.6654860,
                        lng: 139.7706670
                    }
                },
                {
                    id: 2,
                    name: 'Meguro Kakinokizaka Post Office',
                    position: {
                        lat: 35.6189925,
                        lng: 139.674759
                    }
                }
            ],
        };
        this.moveToken = this.moveToken.bind(this)
    }

    render() {
        const {
            classes,
        } = this.props;

        return (
            <div className={classes.root}>

                {this.state.candidates.map((data, index) =>
                    <Token
                        name={data.name}
                        key={index}
                        id={data.id}
                        index={index}
                        moveToken={this.moveToken}
                    />
                )}


            </div>
        )

    }
}

Candidate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default DragDropContext(HTML5Backend)(withStyles(styles)(Candidate));