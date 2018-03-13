import React from 'react';
import {shallow} from 'enzyme';

import StatusUpdater from '../components/statusupdater'

describe.skip('StatusUpdater', () => {
    it('should render without crashing', () => {
        shallow(<StatusUpdater/>);
    });

    it('should display decision options if given type "decision"', () => {
        const decisions = [
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
        ];
        const wrapper = shallow(<StatusUpdater type="decision"/>);
        expect(wrapper.find('option')).toHaveLength(decisions.length);
        decisions.forEach(decision => {
            expect(wrapper.contains(<option value={decision.short}>{decision.long}</option>)).toEqual(true);
        })
    });

    it('should display recommendation options if given type "recommendation"', () => {
        const recommendations = [
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
        ];
        const wrapper = shallow(<StatusUpdater type="recommendation"/>);
        expect(wrapper.find('option')).toHaveLength(recommendations.length);
        recommendations.forEach(recommendation=> {
            expect(wrapper.contains(<option value={recommendation.short}>{recommendation.long}</option>)).toEqual(true);
        })
    });
});
