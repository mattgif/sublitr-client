import React from 'react';
import {shallow, mount} from 'enzyme';
import {Link} from 'react-router-dom';

import SubmissionCard from '../components/cardsubmission';

describe.skip('CardReview', () => {
    const submission = {
        title: 'Test title',
        author: 'Alfred Armani',
        submitted: '2018-03-12',
        publication: 'Test pub',
        status: 'none',
        url: '#',
        reviewerInfo: {
            decision: 'none',
            recommendation: 'Decline',
            lastAction: '2018-03-12'
        }
    };

    it('should render without crashing', () => {
        shallow(<SubmissionCard/>)
    });

    it('should include a status icon with class matching provided status', () => {
        const status = '.' + submission.status;
        const wrapper = shallow(<SubmissionCard submission={submission}/>);
        expect(wrapper.find(status)).toHaveLength(1);
    });

    it('should include publication & submission names', () => {
        const wrapper = shallow(<SubmissionCard submission={submission}/>);
        expect(wrapper.contains(<div className='publication'>
            <p>{submission.publication}</p></div>)).toEqual(true);
        expect(wrapper.contains(<div className='title'>
            <p>{submission.title}</p></div>)).toEqual(true);
    });

    it('should list status details and delete button if it is expanded', () => {
        const wrapper = shallow(<SubmissionCard submission={submission} expanded={true}/>);
        expect(wrapper.contains(<time>{submission.submitted}</time>)).toEqual(true);
        expect(wrapper.contains(<li>Status: {submission.status}</li>)).toEqual(true);
        expect(wrapper.find('.delete')).toHaveLength(1);
    });

    it('should not display status details and delete button if not expanded', () => {
        const wrapper = shallow(<SubmissionCard submission={submission} />);
        expect(wrapper.contains(<time>{submission.submitted}</time>)).toEqual(false);
        expect(wrapper.contains(<li>Status: {submission.status}</li>)).toEqual(false);
        expect(wrapper.find('.delete')).toHaveLength(0);
    });
});