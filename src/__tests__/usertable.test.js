import React from 'react';
import {shallow} from 'enzyme';

import {UserTable} from '../components/usertable';

const testUsers = [
    {id: 'u111111', first: "Abe", last: "Abrams", email: "aabrams@example.com", editor: false},
    {id: 'u222222', first: "Betty", last: "Brown", email: "bbrown@example.com", editor: true},
    {id: 'u333333', first: "Charlie", last: "Chaplin", email: "cchaps@example.com", editor: true},
    {id: 'u444444', first: "Debbie", last: "Douglas", email: "ddougs@example.com", editor: false},
];

describe('UserTable', ()=> {
    it('should render without crashing', ()=> {
       shallow(<UserTable/>);
    });

    it('should be a table with correct headers', () => {
        const headers = ['Last', 'First', 'Email', 'Editor'];
        let wrapper = shallow(<UserTable users={testUsers}/>);
        expect(wrapper.find('table')).toHaveLength(1);
        expect(wrapper.find('th')).toHaveLength(headers.length);
    });
});