import React from 'react';
import {shallow} from 'enzyme';

import {Dashboard} from '../components/dashboard';

describe('Dashboard', () => {
    it('should render without failing', () => {
        shallow(<Dashboard/>);
    });
});