import React from 'react';
import {shallow} from 'enzyme';

import TabHeader from '../components/tabheader';

describe('TabHeader', () => {
    it('should render without crashing', () => {
        shallow(<TabHeader/>);
    });

    it('should contain an h2 element with supplied title', () => {
        const title = 'This is a tab title';
        const wrapper = shallow(<TabHeader title={title}/>);
        expect(wrapper.contains(<h2>{title}</h2>)).toEqual(true);
    });

    it('should render secondary components', () => {
        const secondary = ['<p><a href="#">+ New Submission</a></p>', '<p>Another secondary component</p>'];
        const wrapper = shallow(<TabHeader secondary={secondary}/>);
        secondary.forEach(element => {
            expect(wrapper.contains(element)).toEqual(true);
        });
    });

    it('should render filters, if supplied', () => {
        const filters = ['test1', 'test2', 'test3'];
        // TODO: rewrite once filter component is built
        const wrapper = shallow(<TabHeader filters={filters}/>);
        filters.forEach(filter => {
            expect(wrapper.contains(filter)).toEqual(true);
        });
    });
});