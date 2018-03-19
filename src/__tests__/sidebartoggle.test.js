import React from 'react';
import {shallow} from 'enzyme';

import SidebarToggle from '../components/mobilemenutoggle';

describe.skip('SidebarToggle', () => {
    it('should render without crashing', () => {
        shallow(<SidebarToggle/>)
    });

    it('should have a checkbox input', () => {
        const wrapper = shallow(<SidebarToggle/>);
        expect(wrapper.find('input').prop('type')).toEqual('checkbox');
    });
});