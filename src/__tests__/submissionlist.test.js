import React from 'react';
import {shallow} from 'enzyme';

import SubmissionList from '../components/submissionlist'
import SubmissionCard from "../components/submissioncard";

describe('SubmissionList', () => {
    it('should render without crashing', () => {
        shallow(<SubmissionList/>)
    });

    it('should contain an li for each submission card', () => {
        const submissions = ['card1', 'card2', 'card3'];
        const wrapper = shallow(<SubmissionList submissions={submissions}/>);
        submissions.forEach(card => {
            expect(wrapper.contains(<li><SubmissionCard submission={card} editor={false}/></li>)).toEqual(true);
        });
    });

    it('should return a no submissions found message if no submissions provided', () => {
        const wrapper = shallow(<SubmissionList/>);
        expect(wrapper.find('.error')).toHaveLength(1);
    })
});