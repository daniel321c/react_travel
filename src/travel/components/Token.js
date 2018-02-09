import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import Chip from 'material-ui/Chip';

import { findDOMNode } from 'react-dom'

const tokenSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
        };
    }
};
const tokenTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index
        const hoverIndex = props.index

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        // Determine mouse position
        const clientOffset = monitor.getClientOffset()

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
        }

        // Time to actually perform the action
        props.moveToken(dragIndex, hoverIndex)

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex
    },
}



function dropCollect(connect) {
    return {
        connectDropTarget: connect.dropTarget(),
    }
}
function dragCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.getItem(),
    }
}

class Token extends Component {

    handleDelete() {

    }
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }
    render() {
        const { connectDropTarget, connectDragSource, isDragging, name,id } = this.props;
        console.log(name);
        console.log(isDragging);
        return connectDragSource(connectDropTarget(
            <div style={{
                 opacity: isDragging ? isDragging.id == id? 0.5 :1 : 1,
                cursor: 'move',
                display: 'inline-block',
                borderRadius: 16,
                backgroundColor: 'white'
            }}>
                <Chip
                    label={name}
                    onDelete={this.handleDelete}
                />
            </div>
        ));
    }
}

Token.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    //isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
};

export default DragSource('token', tokenSource, dragCollect)(DropTarget('token', tokenTarget, dropCollect)(Token));