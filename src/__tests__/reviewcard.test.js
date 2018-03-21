import React from 'react';
import {shallow, mount} from 'enzyme';
import ReviewCard from '../components/collapsablecard'

describe.skip('ReviewCard', () => {
    it('should render without crashing', () => {
        shallow(<ReviewCard/>)
    });
});