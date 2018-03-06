import React from 'react';
import {shallow} from 'enzyme';
import RegistrationForm from '../components/registrationform';

describe('RegistrationForm', () => {
    it('should render without crashing', () => {
        shallow(<RegistrationForm/>)
    });

    it('should contain a form', () => {
        const wrapper = shallow(<RegistrationForm/>);
        expect(wrapper.find('form').exists()).toEqual(true);
    })
});