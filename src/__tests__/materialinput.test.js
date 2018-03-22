import React from 'react';
import {shallow} from 'enzyme';

import MaterialInput from '../components/materialinput';

describe.skip('MaterialInput', () => {
    it('should render without crashing', () => {
        shallow(<MaterialInput/>)
    });
});
