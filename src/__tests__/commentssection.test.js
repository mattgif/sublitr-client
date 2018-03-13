import React from 'react';
import {shallow} from 'enzyme';

import CommentSection from '../components/commentsection';

describe.skip('CommentSection', () => {
    it('should render without crashing', () => {
       shallow(<CommentSection/>);
    });

    describe.skip('components', () => {
        it('should have a section header', () => {
            const wrapper = shallow(<CommentSection/>);
            expect(wrapper.contains(<h2>Comments</h2>)).toEqual(true);
        });

        it('should include a CommentForm', () => {
            const wrapper = shallow(<CommentSection/>);
            expect(wrapper.find('CommentForm')).toHaveLength(1);
        })
    });
});