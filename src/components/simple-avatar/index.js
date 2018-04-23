import React from 'react';
import {stringToColor, invertColor} from '../../actions/utils';

export default function SimpleAvatar(props) {
    const {name} = props;
    const color = stringToColor(name);
    const backgroundColor = invertColor(color);
    const initials = name.split(' ')[0][0] + name.split(' ')[1][0];

    return (
        <div style={{
            backgroundColor: backgroundColor,
            color: color,
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            fontFamily: 'monospace',
            fontSize: '20px',
            lineHeight: '30px',
            textAlign: 'center'
        }} className='avatar'>
            {initials}
        </div>
    )
}
