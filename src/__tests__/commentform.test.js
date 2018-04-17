import React from 'react';
import {shallow} from 'enzyme';

import CommentForm from '../components/comments/comment-form/index'

describe('CommentForm', () => {
    it('should render without crashing', () => {
        shallow(<CommentForm/>)
    });
});
