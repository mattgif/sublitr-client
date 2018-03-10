import React from 'react';
import {shallow} from 'enzyme';

import CommentForm from '../components/commentform'

describe('CommentForm', () => {
    it('should render without crashing', () => {
        shallow(<CommentForm/>)
    });

    describe('form elements', () => {
        const wrapper = shallow(<CommentForm/>);
        it('should have a form', ()=> {
            expect(wrapper.find('form')).toHaveLength(1);
        });

        it('should have a textarea input', () => {
            expect(wrapper.find('textarea')).toHaveLength(1);
        });

        it('should have a submit button', () => {
            expect(wrapper.find('button')).toHaveLength(1);
        });
    })
});
