import React from 'react';
import {shallow} from 'enzyme';

import Dashboard from '../components/dashboard';

describe('Dashboard', () => {
    it('should render without failing', () => {
        shallow(<Dashboard/>);
    });

    it('should contain a header with user\'s name as title', () => {
        const user = {first: 'Ima', last: 'Maginary'};
        const wrapper = shallow(<Dashboard user={user}/>);
        expect(wrapper.find('PageHeader').prop("title")).toEqual(user.first + ' ' + user.last);
    });

    it('should contain a tab list', () => {
        const wrapper = shallow(<Dashboard/>);
        expect(wrapper.find('TabList')).toHaveLength(1);
    });

    describe('submissions tab', () => {
        it.skip('should display the submissions tab by default', () => {
            const wrapper = shallow(<Dashboard/>);
            expect(wrapper.find('TabSubmissions')).toHaveLength(1);
        });

        it('should display the submissions tab when submissions is selected', () =>  {
            const wrapper = shallow(<Dashboard active="submissions"/>);
            expect(wrapper.find('TabSubmissions')).toHaveLength(1);
        })
    });

    describe('review tab', () => {
        const wrapper = shallow(<Dashboard active='review'/>);
        it('should display the review tab if review is active', () => {
            expect(wrapper.find('TabReview')).toHaveLength(1);
        })
    });

    describe('users tab', () => {
        const wrapper = shallow(<Dashboard active='users'/>);
        it('should display the user tab if users is active', () => {
            expect(wrapper.find('TabUsers')).toHaveLength(1);
        });
    })
});