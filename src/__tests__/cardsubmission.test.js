import React from 'react';
import {shallow} from 'enzyme';
import CardSubmission from '../components/cardsubmission';

describe('CardSubmission', () => {
   it('should render without crashing', () => {
       shallow(<CardSubmission/>)
   });

   describe('basic elements should be present', () => {
       let wrapper = shallow(<CardSubmission/>);

       it('should contain a status indicator', () => {
           expect(wrapper.find('StatusIndicator')).toHaveLength(1);
       });

       it('should have a collapsable div', () => {
           expect(wrapper.find('div.additional')).toHaveLength(1);
       });

       it('should have a delete submission button', () => {
           expect(wrapper.find('Connect')).toHaveLength(1);
       });
   });

   describe('collapse logic', () => {
       let wrapper = shallow(<CardSubmission/>);

       it('should hide additional section by default', () => {
           expect(wrapper.find('.additional').hasClass('hidden')).toEqual(true);
       });

       it('should toggle hidden off when card is clicked', () => {
           wrapper.simulate('click');
           expect(wrapper.find('.additional').hasClass('hidden')).toEqual(false);
       });

       it('should toggle hidden on when card is clicked a second time', () => {
           wrapper.simulate('click');
           expect(wrapper.find('.additional').hasClass('hidden')).toEqual(true);
       });
   })
});