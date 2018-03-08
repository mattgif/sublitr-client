import React from 'react';
import {shallow} from 'enzyme';

import SubmissionList from '../components/submissionlist'

describe('SubmissionList', () => {
    it('should render without crashing', () => {
        shallow(<SubmissionList/>)
    });

    it('should contain an li for each submission card', () => {
        const submissions = ['card1', 'card2', 'card3'];
        // TODO: add submissioncards when SubmissionCard module built
        const wrapper = shallow(<SubmissionList submissions={submissions}/>);
        console.log(wrapper.debug());
        submissions.forEach(card => {
            expect(wrapper.contains(<li>{card}</li>)).toEqual(true);
        });
    });

    it('should return a no submissions found message if no submissions provided', () => {
        const wrapper = shallow(<SubmissionList/>);
        expect(wrapper.find('.error')).toHaveLength(1);
    })
});