import React from 'react';
import {shallow} from 'enzyme';

import CollapsableCard from '../components/collapsablecard';

describe('CollapsableCard', () => {
    it('should render without crashing', () => {
        shallow(<CollapsableCard/>);
    });

    describe('collapse logic', () => {
        const wrapper = shallow(<CollapsableCard/>);
        it('should set expanded to false by default', () => {
            expect(wrapper.state().expanded).toEqual(false);
        });

        it('should toggle hidden off when card is clicked', () => {
            wrapper.simulate('click');
            expect(wrapper.state().expanded).toEqual(true);
        });

        it('should toggle hidden on when card is clicked a second time', () => {
            wrapper.simulate('click');
            expect(wrapper.state().expanded).toEqual(false);
        });
    })
});