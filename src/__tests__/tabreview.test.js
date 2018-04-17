import React from 'react';
import {shallow} from 'enzyme';

import {TabReview} from '../components/dashboard/review-pane/index';

describe.skip('TabReview', () => {
    it('should render without crashing', () => {
        shallow(<TabReview/>)
    });
});
