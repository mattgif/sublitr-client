import React from 'react';
import {shallow} from 'enzyme';

import Navbar from '../components/navbar';

describe('Navbar', () => {
    it('should render without crashing', () => {
        shallow(<Navbar/>);
    });

    it('should have a dashboard link', ()=> {
        let wrapper = shallow(<Navbar/>);
        expect(wrapper.find('Link')).toHaveLength(1);
    });

    it('should have a login/out button', () => {
        let wrapper = shallow(<Navbar/>);
        expect(wrapper.find('button')).toHaveLength(1);
    })
});