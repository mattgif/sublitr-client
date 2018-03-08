import React from 'react';
import {shallow} from 'enzyme';

import TabContent from '../components/tabcontent';
import TabHeader from '../components/tabheader';

describe('TabContent', () => {
    it('should render w/o crashing', () => {
       shallow(<TabContent/>);
    });

    it('should include header component, if supplied', () => {
        const wrapper = shallow(<TabContent header={<TabHeader/>}/>);
        expect(wrapper.contains(<TabHeader/>)).toEqual(true);
    })
});