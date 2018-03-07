import React from 'react';
import {shallow} from 'enzyme';

import MaterialInput from '../components/materialinput';

describe('MaterialInput', () => {
    it('should render without crashing', () => {
        shallow(<MaterialInput/>)
    });

    it('should contain a text input by default', () => {
        expect(shallow(<MaterialInput/>).contains(<input type="text"/>)).toEqual(true)
    });

    it('should have input with specified values', () => {
        const label = 'Foobar';
        const field = 'Bizzbang';
        const fieldType = "email";
        let wrapper = shallow(<MaterialInput label={label} field={field} fieldType={fieldType}/>);
        expect(wrapper.contains(<input type={fieldType} name={field} id={field} />)).toEqual(true);
    });
});
