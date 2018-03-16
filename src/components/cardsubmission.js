import React from 'react';
import StatusIndicator from "./statusindicator";
import CollapsableCard from "./collapsablecard";


export default class CardSubmission extends CollapsableCard {
    render() {
        return (
            <div className="card" onClick={this.handleClick.bind(this)}>
                <StatusIndicator status={this.props.status}/>
                <div>
                    <div className='publication'><p>{this.props.publication}</p></div>
                    <div className='title'><p>{this.props.title}</p></div>
                </div>

                <div className={this.state.expanded ? "additional" : "hidden additional"}>
                    <ul>
                        <li>Status: {this.props.status}</li>
                        <li>Submitted: <time>{this.props.submissionDate}</time></li>
                    </ul>
                    <button className="delete">Delete</button>
                </div>
            </div>
        )
    }
}
