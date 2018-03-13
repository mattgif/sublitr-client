import React from 'react';
import {shallow} from 'enzyme';

import CommentCard from '../components/commentcard';

describe.skip('CommentCard', () => {
    it('should render without crashing', () => {
        shallow(<CommentCard/>);
    });

    it('should be an li', () => {
        const wrapper = shallow(<CommentCard/>);
        expect(wrapper.find('li')).toHaveLength(1);
    });

    it('should have a div for text', () => {
        const wrapper = shallow(<CommentCard/>);
        expect(wrapper.find('div.comments__body')).toHaveLength(1);
    });

    describe.skip('footer', () => {
        const wrapper = shallow(<CommentCard/>);
        it('should have a footer', () => {
            expect(wrapper.find('div.comments__footer')).toHaveLength(1);
        });

        it('should include commenter name & date posted', () => {
            expect(wrapper.find('div.comments__footer').children()).toHaveLength(2);
        });
    });
});