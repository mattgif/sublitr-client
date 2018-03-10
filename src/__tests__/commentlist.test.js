import React from 'react';
import {shallow} from 'enzyme';

import CommentList from '../components/commentlist';

describe('CommentList', () => {
   it('should render without crashing', () => {
       shallow(<CommentList/>)
   });

   it('should be a list', () => {
       let wrapper = shallow(<CommentList/>);
       expect(wrapper.find('ul')).toHaveLength(1);
   })
});