import React from 'react';

class Card extends React.Component {
    constructor (props) {
        super(props);
        this.state = { expanded: false };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        const {cardId, cardClicked} = this.props;
        this.props.onClick(cardId, cardClicked);
        this.setState({ expanded: !this.state.expanded});
    }

    render () {
        return (
            <li>
                onClick={this.handleClick.bind(this)}
                {this.props.children}
            </li>
        );
    }
}
export default Card;