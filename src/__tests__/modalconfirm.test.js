import React from 'react';
import {shallow} from 'enzyme';

import ModalConfirm from '../components/modalconfirm';

describe('ModalConfirm', () => {
    it('should render without crashing', () => {
       shallow(<ModalConfirm/>)
    });

    it('should contain two buttons', () => {
       let wrapper = shallow(<ModalConfirm/>);
       expect(wrapper.find('button')).toHaveLength(2);
    });
});

