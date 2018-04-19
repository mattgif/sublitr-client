import React from 'react';
import {shallow} from 'enzyme';

import Landing from '../components/landing-screen/landing';

describe('Landing page', () => {
    it('should render without crashing', () => {
        shallow(<Landing/>)
    });

    it('should include a registration form', () => {
        const wrapper = shallow(<Landing/>);
        expect(wrapper.find('ReduxForm')).toHaveLength(1);
    });
});