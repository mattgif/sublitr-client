import React from 'react';
import {shallow} from 'enzyme';

import {CommentCard} from '../components/comments/comment-card/index';

const defaultComment = {text: '', name: '', date: ''};
describe('CommentCard', () => {
    it('should render without crashing', () => {
        shallow(<CommentCard comment={defaultComment}/>);
    });
});
