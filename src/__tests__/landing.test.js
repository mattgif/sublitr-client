import React from 'react';
import {shallow} from 'enzyme';

import Landing from '../components/landing-screen/landing';

describe('Landing page', () => {
    it('should render without crashing', () => {
        shallow(<Landing/>)
    });

    it('should have a page header', () => {
        const wrapper = shallow(<Landing/>);
        expect(wrapper.find('PageHeader'))
    });

    it('should have three sections (two info plus form)', () => {
        const wrapper = shallow(<Landing/>);
        expect(wrapper.find('section')).toHaveLength(3);
    });

    it('should have a header for every section', () => {
        const wrapper = shallow(<Landing/>);
        expect(wrapper.find('section h3')).toHaveLength(3);
    });

    it('should include a registration form', () => {
        const wrapper = shallow(<Landing/>);
        expect(wrapper.find('ReduxForm')).toHaveLength(1);
    });
});