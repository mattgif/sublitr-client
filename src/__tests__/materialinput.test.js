import React from 'react';
import {shallow} from 'enzyme';

import MaterialInput from '../components/forms/form-elements/materialinput';

const mockMeta = {
    active: false,
    error: undefined,
    warning: undefined
};

const mockInput = {};

describe('MaterialInput', () => {
    it('should render without crashing', () => {
        shallow(<MaterialInput  meta={mockMeta} input={mockInput}/>)
    });
});
