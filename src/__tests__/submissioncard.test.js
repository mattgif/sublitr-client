import React from 'react';
import {shallow} from 'enzyme';

import SubmissionCard from '../components/cardsubmission';

describe('CardReview', () => {
    it('should render without crashing', () => {
        shallow(<SubmissionCard/>)
    });
});