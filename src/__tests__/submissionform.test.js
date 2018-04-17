import React from 'react';
import {shallow} from 'enzyme';

import SubmissionForm from '../components/forms/submission-form/submissionform';

describe('SubmissionForm', () => {
   it('should render without crashing', () => {
      shallow(<SubmissionForm/>);
   });
});