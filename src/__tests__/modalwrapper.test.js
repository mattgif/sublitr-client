import React from 'react';
import {shallow} from 'enzyme';

import ModalWrapper from '../components/modalwrapper';

describe.skip('ModalWrapper', () => {
    it('should render without crashing', () => {

    });

    it('should have an overlay div', () => {
        let wrapper = shallow(<ModalWrapper/>);
        expect(wrapper.contains(<div className="modal__overlay"></div>)).toEqual(true);
    })

    it('should have a close button', () => {
        let wrapper = shallow(<ModalWrapper/>);
        expect(wrapper.find('button.modal__close')).toHaveLength(1);
    });

    it('should have an h2 header', () => {
        let wrapper = shallow(<ModalWrapper/>);
        expect(wrapper.find('h2')).toHaveLength(1);
    });

    it('should have a div for the modal content', () => {
        let wrapper = shallow(<ModalWrapper/>);
        expect(wrapper.find('div.modal__content')).toHaveLength(1);
    });
});