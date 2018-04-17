import React from 'react';
import {shallow} from 'enzyme';

import {TabList} from '../components/dashboard/tablist'

describe('TabList', () => {
    it('should render w/o crashing', () => {
        shallow(<TabList />)
    });

    it('should be a nav component', () => {
        const wrapper = shallow(<TabList />);
        expect(wrapper.find('nav')).toHaveLength(1);
    });

    it('should contain a ul with correct # of li elements', () => {
        const wrapper = shallow(<TabList />);
        expect(wrapper.find('ul')).toHaveLength(1);
        expect(wrapper.find('li')).toHaveLength(3);
    });
});