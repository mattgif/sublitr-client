import React from 'react';
import {Icon} from 'semantic-ui-react';

export default function CustomFileButton(props) {
    let file;
    if (props.fileName) {
        file = <dl>
            <dt>File:</dt>
            <dd><Icon name='file pdf outline'/> {props.fileName}</dd>
        </dl>
    }
    return (
        <div className="custom__file__button">
            <button type="button" onClick={props.click}><Icon name='cloud upload'/> Choose file</button>
            {file}
        </div>
    )
}