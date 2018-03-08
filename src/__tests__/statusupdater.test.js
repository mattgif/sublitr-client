import React from 'react';
import {shallow} from 'enzyme';

import StatusUpdater from '../components/statusupdater'

describe('StatusUpdater', () => {
    it('should render without crashing', () => {
        shallow(<StatusUpdater/>);
    });

    it('should contain all of the supplied options', () => {
       const options = [
           {value: 'pending', label: 'ND'},
           {value: 'revise', label: 'R&R'},
           {value: 'accepted', label: 'A'},
           {value: 'declined', label: 'D'}
       ];
       const wrapper = shallow(<StatusUpdater options={options}/>);
       expect(wrapper.find('option')).toHaveLength(options.length);
    });

    it('should select the correct option', () => {
        const options = [
            {value: 'pending', label: 'ND'},
            {value: 'revise', label: 'R&R'},
            {value: 'accepted', label: 'A'},
            {value: 'declined', label: 'D'}
        ];
        const selected = 'pending';
        const wrapper = shallow(<StatusUpdater options={options} selected={selected}/>);
        expect(wrapper.find('select').prop('value')).toEqual(selected);
    });
});