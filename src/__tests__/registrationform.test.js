import React from 'react';
import {shallow} from 'enzyme';
import {RegistrationForm} from '../components/forms/registration-form/registrationform';

describe('RegistrationForm', () => {
    it('should render without crashing', () => {
        const dispatch = jest.fn();
        const handleSubmit = jest.fn();
        shallow(<RegistrationForm handleSubmit={handleSubmit} dispatch={dispatch}/>)
    });

    it('should contain a form', () => {
        const dispatch = jest.fn();
        const handleSubmit = jest.fn();
        const wrapper = shallow(<RegistrationForm handleSubmit={handleSubmit} dispatch={dispatch}/>);
        expect(wrapper.find('form')).toHaveLength(1);
    });
});