import React from 'react';
import {shallow} from 'enzyme';

import InfoSection from '../components/infosection'

describe('InfoSection', () => {
   it('should render without crashing', () => {
       shallow(<InfoSection/>);
   });

   it('should contain an h3 with the section title', () => {
       const sectionTitle = 'Foo';
       const wrapper = shallow(<InfoSection sectionTitle={sectionTitle}/>);
       expect(wrapper.contains(<h3>{sectionTitle}</h3>)).toEqual(true);
   });
});