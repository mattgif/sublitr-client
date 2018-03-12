import React from 'react';
import {shallow} from 'enzyme';

import DocViewer from '../components/docviewer';

describe('DocViewer', () => {
    it('should render without crashing', () => {
        shallow(<DocViewer/>);
    });

    it('should contain a sidebar', () => {
        let wrapper = shallow(<DocViewer/>);
        expect(wrapper.find('Sidebar')).toHaveLength(1);
    });

    it('should have a SidebarToggle', () => {
        let wrapper = shallow(<DocViewer/>);
        expect(wrapper.find('SidebarToggle')).toHaveLength(1);
    });

    it('should have a PageHeader', () => {
        let wrapper = shallow(<DocViewer/>);
        expect(wrapper.find('PageHeader')).toHaveLength(1);
    });

    describe('react-pdf', () => {
        let wrapper = shallow(<DocViewer/>);
        it('should have a Document element', () => {
            expect(wrapper.find('Document')).toHaveLength(1);
        });

        it('should have a Page element', () => {
            expect(wrapper.find('Page')).toHaveLength(1);
        });
    });
});