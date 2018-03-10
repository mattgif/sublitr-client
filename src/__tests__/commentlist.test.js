import React from 'react';
import {shallow} from 'enzyme';

import CommentList from '../components/commentlist';

describe('CommentList', () => {
   it('should render without crashing', () => {
       shallow(<CommentList/>)
   });
});