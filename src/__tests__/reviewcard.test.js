import React from 'react';
import {shallow, mount} from 'enzyme';
import { Router, Route } from 'react-router';
import { createMemoryHistory } from 'history';

import {ReviewCard} from '../components/submission-cards/review-card/index'

const testSubmission = {
    id: 777777,
    title: 'Title of Submission',
    author: 'Rea Roos',
    submitted: '2018-01-01',
    publication: 'Journal 1',
    status: 'pending',
    url: '#',
    file: "http://damnthecaesars.org/pdfs/spicer-extracts.pdf",
    reviewerInfo: {
        decision: 'pending',
        recommendation: 'none',
        lastAction: '2018-01-01',
    }
};

const statusLists = {
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
};

describe('ReviewCard', () => {
    it('should render without crashing', () => {
        const testSubmissionCopy = Object.assign({}, testSubmission);
        shallow(<ReviewCard submission={testSubmissionCopy} statusLists={statusLists}/>)
    });

    describe('basic elements are present', () => {
        // Router required to render Link element
        const testSubmissionCopy = Object.assign({}, testSubmission);
        const wrapper = mount(
            <Router history={createMemoryHistory()}>
                <Route path='/' render={() => (
                    <ReviewCard submission={testSubmissionCopy} statusLists={statusLists}/>)}/>
            </Router>
            );
        it('should contain a status indicator', () => {
            expect(wrapper.find('StatusIndicator')).toHaveLength(1);
        });

        it('should have a collapsable element', () => {
            expect(wrapper.find('dl.additional')).toHaveLength(1);
        });

        it('should contain a link to the submission\'s review page', () => {
            expect(wrapper.find('a').prop('href')).toEqual(`/submission/${testSubmissionCopy.id}`)
        })
    });

    describe('collapse logic', () => {
        const testSubmissionCopy = Object.assign({}, testSubmission);
        const wrapper = shallow(<ReviewCard submission={testSubmissionCopy} statusLists={statusLists}/>);
        it('should hide additional section by default', () => {
            expect(wrapper.find('.additional').hasClass('hidden')).toEqual(true);
        });

        it('should toggle hidden off when card is clicked', () => {
            wrapper.simulate('click');
            expect(wrapper.find('.additional').hasClass('hidden')).toEqual(false);
        });

        it('should toggle hidden on when card is clicked a second time', () => {
            wrapper.simulate('click');
            expect(wrapper.find('.additional').hasClass('hidden')).toEqual(true);
        });
    })
});