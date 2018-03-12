import React from 'react';
import {shallow} from 'enzyme';

import TabContent from '../components/tabcontent';

describe('TabContent', () => {
    it('should render w/o crashing', () => {
       shallow(<TabContent/>);
    });

    it('should include header component', () => {
        const wrapper = shallow(<TabContent/>);
        expect(wrapper.find('h2')).toHaveLength(1);
    });

    describe('submissions tab', () => {
        it('should display the submissions tab by default', () => {
            const wrapper = shallow(<TabContent/>);
            expect(wrapper.find('SubmissionList')).toHaveLength(1);
        });

        it('should have a link to the create a new submission screen', () => {
            const wrapper = shallow(<TabContent active="submissions"/>);
            expect(wrapper.find('Link')).toHaveLength(1);
        });

        it('should have a select menu with status types', () => {
            const wrapper = shallow(<TabContent active="submissions"/>);
            expect(wrapper.find('select')).toHaveLength(1);
            expect(wrapper.find('option')).toHaveLength(5);
        });
    });

    describe('review tab', () => {
        const wrapper = shallow(<TabContent active='review'/>);
        it('should display the review tab if review is active', () => {
            expect(wrapper.find('SubmissionList')).toHaveLength(1);
        });

        it('should contain decision, recommendation, and publication filters', () => {
            expect(wrapper.find('select')).toHaveLength(3);
        })
    });

    describe('users tab', () => {
        const wrapper = shallow(<TabContent active='users'/>);
        it('should display the user tab if users is active', () => {
            expect(wrapper.find('UserTable')).toHaveLength(1);
        });

        it('should have a select menu for user types', () => {
            expect(wrapper.find('select')).toHaveLength(1);
        });
    })
});