import React from 'react';
import {connect} from 'react-redux';
import {updateStatus} from "../actions";

export class StatusUpdater extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected
        }
    }

    options = this.props.statusLists[this.props.type];
    submissionID = this.props.submissionID;

    handleClick = e => {
        e.stopPropagation()
    };

    handleChange = e => {
        this.props.dispatch(updateStatus(this.props.type, e.target.value, this.submissionID));
    };

    render() {
        return (
            <select value={this.state.selected}
                    onClick={e => this.handleClick(e)}
                    onChange={e => this.handleChange(e)}
            >
                {this.options.map((opt, index) => {
                    return(<option key={index} value={opt.short}>{opt.long}</option>)
                })}
            </select>
        )
    }
}

StatusUpdater.defaultProps = {
    type: 'decision',
};

const mapStateToProps = state => ({
    statusLists: state.sublitr.statusLists
});

export default connect(mapStateToProps)(StatusUpdater)