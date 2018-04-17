import React from 'react';
import {shallow} from 'enzyme';

import TabUsers from '../components/dashboard/user-pane/tabusers';

describe.skip('TabUsers', () => {
    it('should render without crashing', () => {
        shallow(<TabUsers/>)
    });

    it('should include header component', () => {
        const wrapper = shallow(<TabUsers/>);
        expect(wrapper.find('h2')).toHaveLength(1);
    });

    it('should have a select menu for user types', () => {
        const wrapper = shallow(<TabUsers/>);
        expect(wrapper.find('select')).toHaveLength(1);
    });
});
