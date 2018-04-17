import React from 'react';
import {shallow} from 'enzyme';

import SubmissionCard from '../components/submission-cards/basic-card/index';

describe('CardReview', () => {
    it('should render without crashing', () => {
        shallow(<SubmissionCard/>)
    });
});