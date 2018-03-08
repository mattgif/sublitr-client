import React from 'react';
import {shallow} from 'enzyme';

import TabHeader from '../components/tabheader';
import Filter from '../components/filter';

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

    it('should create filters, if supplied', () => {
        const filters = [{name:'test1'}, {name:'test2'}, {name:'test3'}];
        const wrapper = shallow(<TabHeader filters={filters}/>);
        filters.forEach(filter => {
            expect(wrapper.contains(<Filter key={filter.name}
                                            name={filter.name} id={filter.name}/>)).toEqual(true);
        });
    });
});