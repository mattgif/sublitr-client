import React from 'react';
import {shallow} from 'enzyme';

import Filter from '../components/filter';

describe('Filter', () => {
    it('should render without crashing', () => {
        shallow(<Filter/>)
    });

    it('should have select element w/name and id from props', () => {
        const name = 'foo';
        const wrapper = shallow(<Filter name={name}/>);
        expect(wrapper.contains(<select name={name} id={name}/>)).toEqual(true);
    });

    it('should have all options provided in props', () => {
        const name = 'foo';
        const options = [
            {value: 'all', label: 'All submissions'},
            {value: 'pending', label: 'Pending review'}
        ];
        const wrapper = shallow(<Filter name={name} options={options}/>);
        expect(wrapper.find('option')).toHaveLength(options.length);
    });

    // TODO: Multiple selector
});