import React from 'react';
import {shallow} from 'enzyme';

import SubmissionForm from '../components/submissionform';

describe.skip('SubmissionForm', () => {
   it('should render without crashing', () => {
      shallow(<SubmissionForm/>);
   });

   it('should have a header and a form', () => {
       let wrapper = shallow(<SubmissionForm/>);
       expect(wrapper.find('form')).toHaveLength(1);
       expect(wrapper.find('PageHeader')).toHaveLength(1);
   });

   describe.skip('form elements', () => {
       let wrapper = shallow(<SubmissionForm/>);
       it('should contain fieldsets for info, cover letter, and document upload', () => {
           expect(wrapper.find('fieldset')).toHaveLength(3);
       });

       it('should contain a MaterialInput the title', () => {
           expect(wrapper.find('MaterialInput')).toHaveLength(1)
       });

       it('should contain a select for publication', () => {
           expect(wrapper.find('select')).toHaveLength(1);
       });

       it('should have a textarea for the cover letter', ()=> {
           expect(wrapper.find('textarea')).toHaveLength(1);
       });

       it('should have a file uploader', () => {
           expect(wrapper.find('input[type="file"]')).toHaveLength(1);
       });

       it('should have a submit button', () => {
           expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
       })
   })
});