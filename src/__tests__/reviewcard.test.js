import React from 'react';
import {shallow, mount} from 'enzyme';
import ReviewCard from '../components/collapsablecard'

describe('ReviewCard', () => {
    it('should render without crashing', () => {
        shallow(<ReviewCard/>)
    });

    it.skip('should contain a status indicator', () => {
        const status = 'pending';
        const recommendation = 'test';
        const url = '#';
        const wrapper = mount(<ReviewCard status={status} recommendation={recommendation} url={url}/>);
        console.log(wrapper.debug());
        expect(wrapper.find('StatusIndicator')).toHaveLength(1);
    })
});