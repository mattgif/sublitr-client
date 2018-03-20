import React from 'react';
import {shallow} from 'enzyme';

import CollapsableCard from '../components/collapsablecard';

describe('CollapsableCard', () => {
    it('should render without crashing', () => {
        shallow(<CollapsableCard/>);
    })
});