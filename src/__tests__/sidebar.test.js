import React from 'react';
import {shallow} from 'enzyme';

import Sidebar from '../components/sidebar';
import PageHeader from "../components/pageheader";
import StatusUpdater from "../components/statusupdater";

describe('Sidebar', () => {
    it('should render without crashing', () => {
        shallow(<Sidebar/>)
    });

    describe('header, status, and comment section', () => {
        const wrapper = shallow(<Sidebar/>);
        it('should render a page header', () => {
            expect(wrapper.find('PageHeader')).toHaveLength(1);
        });
        it('should render the status section', () => {
            expect(wrapper.find('StatusUpdater')).toHaveLength(2);
        });

        it('should render the comments section', ()=> {
            expect(wrapper.find('CommentForm')).toHaveLength(1);
            expect(wrapper.find('CommentList')).toHaveLength(1);
        });
    });
});
