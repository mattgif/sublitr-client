import React from 'react';
import {shallow} from 'enzyme';

import DocViewer from '../components/docviewer';

describe.skip('DocViewer', () => {
    it('should render without crashing', () => {
        shallow(<DocViewer/>);
    });

    it('should contain a sidebar', () => {
        let wrapper = shallow(<DocViewer/>);
        expect(wrapper.find('PushableLeftSidebar')).toHaveLength(1);
    });

    it('should have a SidebarToggle', () => {
        let wrapper = shallow(<DocViewer/>);
        expect(wrapper.find('SidebarToggle')).toHaveLength(1);
    });

    it('should have a PageHeader', () => {
        let wrapper = shallow(<DocViewer/>);
        expect(wrapper.find('PageHeader')).toHaveLength(1);
    });

    describe.skip('react-pdf', () => {
        let wrapper = shallow(<DocViewer/>);
        it('should have a Document element', () => {
            expect(wrapper.find('Document')).toHaveLength(1);
        });
    });
});