import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import SubmissionList from "./submissionlist";

export default function TabReview(props) {
    const pubOptions = props.publications.map((pub, index) => {
        return (<option key={index} value={pub.abbr}>{pub.name}</option>)
    });

    return(
        <Router>
            <section>
                <h2>Review submissions</h2>

                <label htmlFor="decisionFilter">Final decision</label>
                <select className="filter" name="decisionFilter" id="decisionFilter" value={props.filterValues.decisionFilter}>
                    <option value="all">All submissions</option>
                    {props.statusLists.decision.map((status, index) => {
                        return <option key={index} value={status.short}>{status.long}</option>
                    })}
                </select>

                <label htmlFor="recommendationFilter">Reviewer recommendation</label>
                <select className="filter" name="recommendationFilter" id="recommendationFilter"
                        value={props.filterValues.recommendationFilter} multiple>
                    {props.statusLists.recommendation.map((status, index) => {
                        return <option key={index} value={status.short}>{status.long}</option>
                    })}
                </select>

                <label htmlFor="publicationFilter">Publication</label>
                <select className="filter" name="publcationFilter" id="publicationFilter"
                        value={props.filterValues.userFilter}>
                    <option value="all">All publications</option>
                    {pubOptions}
                </select>
                <SubmissionList submissions={props.submissions} editor={true}/>
            </section>
        </Router>
    )
}

TabReview.defaultProps = {
    publications: [
        {name: 'Journal 1', abbr: 'J1'},
        {name: 'Journal 2', abbr: 'J2'},
        {name: 'Magazine 1', abbr: 'M1'},
        {name: 'Magazine 2', abbr: 'M2'}
    ],
    filterValues: {
        recommendationFilter: ["all"],
        publicationFilter: "all",
        decisionFilter: "all"
    },
    statusLists: {
        decision: [
            {
                short: 'pending',
                long: 'No decision'
            },
            {
                short: 'revise',
                long: 'Revise & resubmit'
            },
            {
                short: 'accepted',
                long: 'Accepted'
            },
            {
                short: 'declined',
                long: 'Declined'
            }
        ],
        recommendation: [
            {
                short: 'none',
                long: 'Not reviewed'
            },
            {
                short: 'underReview',
                long: 'Under review'
            },
            {
                short: 'accept',
                long: 'Accept'
            },
            {
                short: 'revise',
                long: 'Revise & Resubmit'
            },
            {
                short: 'consider',
                long: 'Consider'
            },
            {
                short: 'decline',
                long: 'Decline'
            }
        ]
    },
    submissions: [
        {
            title: 'Demo title 1',
            author: 'Rea Roos',
            submitted: '2018-01-01',
            publication: 'Journal 1',
            status: 'pending',
            url: '#',
            reviewerInfo: {
                decision: 'pending',
                recommendation: 'none',
                lastAction: '2018-01-01'
            }
        },
        {
            title: 'Demo title 2',
            author: 'Kylie Keegan',
            submitted: '2018-01-01',
            publication: 'Journal 1',
            status: 'declined',
            url: '#',
            reviewerInfo: {
                decision: 'declined',
                recommendation: 'decline',
                lastAction: '2018-01-01'
            }
        },
        {
            title: 'Demo title 3',
            author: 'Emanuel Eisenstein',
            submitted: '2018-01-01',
            publication: 'Magazine 1',
            status: 'declined',
            url: '#',
            reviewerInfo: {
                decision: 'declined',
                recommendation: 'consider',
                lastAction: '2018-01-01'
            }
        },
        {
            title: 'Demo title 4',
            author: 'Emanuel Eisenstein',
            submitted: '2018-01-01',
            publication: 'Journal 2',
            status: 'accepted',
            url: '#',
            reviewerInfo: {
                decision: 'accepted',
                recommendation: 'accept',
                lastAction: '2018-01-01'
            }
        },
        {
            title: 'Demo title 5',
            author: 'Donna Delapaz',
            submitted: '2018-01-01',
            publication: 'Magazine 1',
            status: 'revise',
            url: '#',
            reviewerInfo: {
                decision: 'revise',
                recommendation: 'revise',
                lastAction: '2018-01-01'
            }
        },
        {
            title: 'Demo title ',
            author: 'Ashanti Ables',
            submitted: '2018-01-01',
            publication: 'Magazine 2',
            status: 'pending',
            url: '#',
            reviewerInfo: {
                decision: 'pending',
                recommendation: 'underReview',
                lastAction: '2018-01-01'
            }
        },
    ]
};