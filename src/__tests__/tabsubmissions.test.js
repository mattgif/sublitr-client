import React from 'react';
import {shallow} from 'enzyme';

import TabSubmissions from '../components/dashboard/submission-pane/tabsubmissions';

describe.skip('TabSubmissions', () => {
    it('should render without crashing', () => {
        shallow(<TabSubmissions/>)
    });

    it('should include header component', () => {
        const wrapper = shallow(<TabSubmissions/>);
        expect(wrapper.find('h2')).toHaveLength(1);
    });

    it('should have a link to the create a new submission screen', () => {
        const wrapper = shallow(<TabSubmissions />);
        expect(wrapper.find('Link')).toHaveLength(1);
    });

    it('should have a select menu with status types', () => {
        const wrapper = shallow(<TabSubmissions />);
        expect(wrapper.find('select')).toHaveLength(1);
        expect(wrapper.find('option')).toHaveLength(5);
    });
});

