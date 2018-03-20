import React from 'react';
import {Link} from 'react-router-dom';
import StatusUpdater from '../components/statusupdater';
import './card.css';
import StatusIndicator from "./statusindicator";
import CollapsableCard from "./collapsablecard";

export default class ReviewCard extends CollapsableCard {
    // CollapsableCard for Reviewer pane
    render() {
        return (
            <div className="card" onClick={this.handleClick.bind(this)}>
                <StatusIndicator status={this.props.status}/>
                <div>
                    <div className='publication'><p>{this.props.publication}</p></div>
                    <div className='title'><p>{this.props.title}</p></div>
                    <div className='author'><p>{this.props.author}</p></div>
                </div>
                <div className={this.state.expanded ? "additional" : "hidden additional"}>
                    <div>
                        <p>Decision:</p>
                        <StatusUpdater type="decision" selected={this.props.status}/>
                    </div>
                    <div>
                        <p>Recommendation:</p>
                        <StatusUpdater type="recommendation" selected={this.props.recommendation}/>
                    </div>

                    <p>Last action: <time>{this.props.lastAction}</time></p>

                    <Link to={this.props.url}>View submission</Link>
                </div>
            </div>
        )
    }
    
}

