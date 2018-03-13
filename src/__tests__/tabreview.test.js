import React from 'react';
import {shallow} from 'enzyme';

import TabReview from '../components/tabreview';

describe.skip('TabReview', () => {
    it('should render without crashing', () => {
        shallow(<TabReview/>)
    });

    it('should include header component', () => {
        const wrapper = shallow(<TabReview/>);
        expect(wrapper.find('h2')).toHaveLength(1);
    });

    it('should display the submission list tab if review is active', () => {
        const wrapper = shallow(<TabReview/>);
        expect(wrapper.find('SubmissionList')).toHaveLength(1);
    });

    it('should contain decision, recommendation, and publication filters', () => {
        const wrapper = shallow(<TabReview/>);
        expect(wrapper.find('select')).toHaveLength(3);
    });

    it('should display a list of all publications', () => {
        const publications = [
            {name: 'Test Test 1', abbr: 'T1'},
            {name: 'Test Test 2', abbr: 'T2'},
            {name: 'Test Test 3', abbr: 'T3'},
        ];
        const wrapper = shallow(<TabReview publications={publications}/>);
        expect(wrapper.find('#publicationFilter option')).toHaveLength(publications.length + 1);
        // +1 accounts for 'all' option
        publications.forEach(pub => {
            expect(wrapper.contains(pub.name)).toEqual(true);

        })
    })
});
