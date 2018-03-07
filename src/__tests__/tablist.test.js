import React from 'react';
import {shallow} from 'enzyme';

import TabList from '../components/tablist'

describe('TabList', () => {
    it('should render w/o crashing', () => {
        shallow(<TabList tabs={[]}/>)
    });

    it('should be a nav component', () => {
        const wrapper = shallow(<TabList tabs={[]}/>);
        expect(wrapper.find('nav')).toHaveLength(1);
    });

    it('should contain a ul with correct # of li elements', () => {
        const tabs = ['Submissions', 'Review', 'Users'];
        const wrapper = shallow(<TabList tabs={tabs}/>);
        expect(wrapper.find('ul')).toHaveLength(1);
        expect(wrapper.find('li')).toHaveLength(3);
    });
});