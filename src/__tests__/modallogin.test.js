import React from 'react';
import {shallow} from 'enzyme';

import LoginModal from '../components/modallogin';

describe('ModalLogin', () => {
    it('should render without crashing', () => {
        shallow(<LoginModal/>);
    });

    it('should be a form', () => {
        let wrapper = shallow(<LoginModal/>);
        expect(wrapper.find('form')).toHaveLength(1);
    });

    it('should have material inputs for email and pw', () => {
        let wrapper = shallow(<LoginModal/>);
        expect(wrapper.find('MaterialInput')).toHaveLength(2)
    });

    it('should have a login button', () => {
        let wrapper = shallow(<LoginModal/>);
        expect(wrapper.find('button')).toHaveLength(1)
    });
});