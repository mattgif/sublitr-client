import React from 'react';
import {shallow} from 'enzyme';
import CardSubmission from '../components/cardsubmission';

describe('CardSubmission', () => {
   it('should render without crashing', () => {
       shallow(<CardSubmission/>)
   })
});