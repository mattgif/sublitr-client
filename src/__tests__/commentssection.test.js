import React from 'react';
import {shallow} from 'enzyme';

import CommentSection from '../components/commentsection';

describe('CommentSection', () => {
    it('should render without crashing', () => {
       shallow(<CommentSection/>);
    });
});