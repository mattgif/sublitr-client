import React from 'react';
import './card.css'

export default class CollapsableCard extends React.Component {
    constructor (props) {
        super(props);
        this.state = { expanded: false };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        this.setState({ expanded: !this.state.expanded});
    }

    render () {
        return (
            <div onClick={this.handleClick.bind(this)}>

            </div>
        );
    }
}