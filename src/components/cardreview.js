import React from 'react';
import {Link} from 'react-router-dom';
import StatusUpdater from '../components/statusupdater';
import './card.css';
import StatusIndicator from "./statusindicator";

export default function ReviewCard(props) {
    return (
        <div className="card">
            <StatusIndicator status={props.status}/>
            <div>
                <div className='publication'><p>{props.publication}</p></div>
                <div className='title'><p>{props.title}</p></div>
                <div className='author'><p>{props.author}</p></div>
            </div>
            <div className="additional">
                <div>
                    <p>Decision:</p>
                    <StatusUpdater type="decision" selected={props.status}/>
                </div>
                <div>
                    <p>Recommendation:</p>
                    <StatusUpdater type="recommendation" selected={props.recommendation}/>
                </div>

                <li>Last action: <time>{props.lastAction}</time></li>

                <Link to={props.url}>View submission</Link>
            </div>
        </div>
    )
}