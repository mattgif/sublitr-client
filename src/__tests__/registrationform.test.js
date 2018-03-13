import React from 'react';
import {shallow} from 'enzyme';
import RegistrationForm from '../components/registrationform';
import MaterialInput from "../components/materialinput";

describe.skip('RegistrationForm', () => {
    it('should render without crashing', () => {
        shallow(<RegistrationForm/>)
    });

    it('should contain a form', () => {
        const wrapper = shallow(<RegistrationForm/>);
        expect(wrapper.find('form').exists()).toEqual(true);
    });

    it('should contain MaterialInputs with appropriate names and types', () => {
        const field1Label = "First Name";
        const field1Name = "firstName";
        const field3Label = "Email";
        const field3Name = "email";
        const field3Type = "email";
        const wrapper = shallow(<RegistrationForm/>);
        expect(wrapper.contains(<MaterialInput label={field1Label} field={field1Name}/>)).toEqual(true);
        expect(wrapper.contains(<MaterialInput type={field3Type} label={field3Label} field={field3Name}/>)).toEqual(true)
    });
});