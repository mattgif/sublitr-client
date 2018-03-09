import React from 'react';
import {shallow} from 'enzyme';

import Sidebar from '../components/sidebar';
import PageHeader from "../components/pageheader";
import StatusUpdater from "../components/statusupdater";

const submissionInfo = {
    publication: 'The Journal of Component Testing',
    title: 'Red, green, refactor',
    author: 'D. Lightful'

};

const status = {
    decision: 'pending',
    userLongName: 'Pending Review',
    submitted: '2017-11-15',
    lastAction: '2017-12-15',
    recommendation: 'underReview'
};

describe('Sidebar', () => {
    it('should render without crashing', () => {
        shallow(<Sidebar/>)
    });

    it('should have a header with supplied info', () => {
        const wrapper = shallow(<Sidebar submissionInfo={submissionInfo}/>);
        expect(wrapper.contains(<PageHeader title={submissionInfo.title} subtitle={submissionInfo.author}/>)).toEqual(true);
    });

    it('should have a status section with two status updaters with correct data', () => {
        const wrapper = shallow(<Sidebar submissionInfo={submissionInfo} status={status}/>);
        expect(wrapper.contains(<StatusUpdater selected={status.decision}/>));
        expect(wrapper.contains(<StatusUpdater selected={status.recommendation}/>));
    });

});