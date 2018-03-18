import React from 'react';
import {connect} from 'react-redux';

export function StatusUpdater(props) {
    const options = props.statusLists[props.type];
    return (
        <select value={props.selected}>
            {options.map((opt, index) => {
                return(<option key={index} value={opt.short}>{opt.long}</option>)
            })}
        </select>
    )
}

StatusUpdater.defaultProps = {
    type: 'decision',
};

const mapStateToProps = state => ({
    statusLists: state.sublitr.statusLists
});

export default connect(mapStateToProps)(StatusUpdater)