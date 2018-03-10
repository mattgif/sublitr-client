import React from 'react';
import {shallow} from 'enzyme';

import CommentForm from '../components/commentform'

describe('CommentForm', () => {
    it('should render without crashing', () => {
        shallow(<CommentForm/>)
    })
});
