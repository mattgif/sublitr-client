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

    it('should contain TabContent', () => {
        const wrapper = shallow(<Dashboard/>);
        expect(wrapper.find('TabContent')).toHaveLength(1);
    });

    it('should display the submissions tab by default', () => {
        const wrapper = shallow(<Dashboard/>);
        expect(wrapper.find('TabList').prop('active')).toEqual('submissions');
        expect(wrapper.find('TabContent').prop('active')).toEqual('submissions');
    });
});