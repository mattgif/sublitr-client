import React from 'react';
import {shallow, mount} from 'enzyme';
import {Link} from 'react-router-dom';

import SubmissionCard from '../components/submissioncard';

describe('SubmissionCard', () => {
    it('should render without crashing', () => {
        shallow(<SubmissionCard/>)
    });

    it('should include a status icon with class matching provided status', () => {
       const status = {decision: 'foo'};
       const wrapper = shallow(<SubmissionCard status={status}/>);
       expect(wrapper.find('.foo')).toHaveLength(1);
    });

    it('should include publication & submission names', () => {
        const publication = 'Journal of Foobar';
        const title = 'Bizzbang, and other poems';
        const wrapper = shallow(<SubmissionCard publication={publication} title={title}/>);
        expect(wrapper.contains(<div className='submissioncard__publication'>
            <p>{publication}</p></div>)).toEqual(true);
        expect(wrapper.contains(<div className='submissioncard__title'>
            <p>{title}</p></div>)).toEqual(true);
    });

    it('should list status details if it is expanded', () => {
        const status = {
            decision: 'pending',
            userLongName: 'Pending Review',
            submitted: '2017-11-15',
            lastAction: '2017-12-15'
        };
        const wrapper = shallow(<SubmissionCard status={status} expanded={true}/>);
        expect(wrapper.contains(<time>{status.submitted}</time>)).toEqual(true);
        expect(wrapper.contains(<time>{status.lastAction}</time>)).toEqual(true);
        expect(wrapper.contains(<li>Status: {status.userLongName}</li>)).toEqual(true);
    });

    it('should not display status details if not expanded', () => {
        const status = {
            decision: 'pending',
            userLongName: 'Pending Review',
            submitted: '2017-11-15',
            lastAction: '2017-12-15'
        };
        const wrapper = shallow(<SubmissionCard status={status} />);
        expect(wrapper.contains(<time>{status.submitted}</time>)).toEqual(false);
        expect(wrapper.contains(<time>{status.lastAction}</time>)).toEqual(false);
        expect(wrapper.contains(<li>Status: {status.userLongName}</li>)).toEqual(false);
    });

    // TODO: check for delete button on user view

    it ('should display author if user is an editor', () => {
        const status = {
            decision: 'pending',
            userLongName: 'Pending Review',
            submitted: '2017-11-15',
            lastAction: '2017-12-15',
        };
        const submissionInfo = {
            title: 'Title',
            publication: 'Publication!',
            author: 'Bizbar Bangfoo'
        };
        const wrapper = shallow(<SubmissionCard status={status} submissionInfo={submissionInfo} editor={true} />);
        expect(wrapper.contains(<div className='submissioncard__author'><p>{submissionInfo.author}</p></div>)).toEqual(true)
    });

    it ('should NOT display author if user is NOT an editor', () => {
        const status = {
            decision: 'pending',
            userLongName: 'Pending Review',
            submitted: '2017-11-15',
            lastAction: '2017-12-15',
            author: 'Bizbar Bangfoo'
        };
        const submissionInfo = {
            title: 'Title',
            publication: 'Publication!',
            author: 'Bizbar Bangfoo'
        };
        const wrapper = shallow(<SubmissionCard status={status} />);
        expect(wrapper.contains(<div className='submissioncard__author'>{submissionInfo.author}</div>)).toEqual(false)
    });

    it('should display editor menu if expanded and user is an editor', () => {
        const status = {
            decision: 'pending',
            userLongName: 'Pending Review',
            submitted: '2017-11-15',
            lastAction: '2017-12-15',
            recommendation: 'underReview'
        };
        const submissionInfo = {
            title: 'Title',
            publication: 'Publication!',
            author: 'Bizbar Bangfoo',
            reviewLink: '#'
        };
        const wrapper = mount(<SubmissionCard status={status} submissionInfo={submissionInfo} editor={true} expanded={true}/>);
        expect(wrapper.contains(<Link to={submissionInfo.reviewLink}>View submission</Link>)).toEqual(true);
        expect(wrapper.find('select')).toHaveLength(2);
    });
});