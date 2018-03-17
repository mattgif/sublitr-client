import React from 'react';
import {shallow} from 'enzyme';

import UserTable from '../components/usertable';

describe.skip('UserTable', ()=> {
    it('should render without crashing', ()=> {
       shallow(<UserTable/>)
    });

    it('should be a table with correct headers', () => {
        const headers = ['Last', 'First', 'Username', 'Editor'];
        let wrapper = shallow(<UserTable/>);
        expect(wrapper.find('table')).toHaveLength(1);
        headers.forEach(header => {
            expect(wrapper.contains(<th>{header}</th>)).toEqual(true);
        })
    });
});