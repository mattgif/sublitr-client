import React from 'react';
import {shallow} from 'enzyme';

import {DocViewer} from '../components/docviewer';

describe.skip('DocViewer', () => {
    it('should render without crashing', () => {
        shallow(<DocViewer/>);
    });
});