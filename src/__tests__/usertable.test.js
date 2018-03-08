import React from 'react';
import {shallow} from 'enzyme';

import UserTable from '../components/usertable';
import UserRow from '../components/userrow';

describe('UserTable', ()=> {
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

    it('should contain a UserRow for each user', () => {
       const users = [
           {
               first: 'Jerry',
               last: 'Fodor',
               username: 'jfodor',
               editor: false
           },
           {
               first: 'Matt',
               last: 'Gifford',
               username: 'mattgif',
               editor: true
           },
           {
               first: 'Rene',
               last: 'Descartes',
               username: 'rdes',
               editor: false
           }
       ];
       let wrapper = shallow(<UserTable users={users}/>);
       expect(wrapper.find('<UserRow>')).toEqual(users.length);
       users.forEach(user => {
           expect(wrapper.contains(<td>{user.first}</td>)).toEqual(true);
           expect(wrapper.contains(<td>{user.last}</td>)).toEqual(true);
           expect(wrapper.contains(<td>{user.username}</td>)).toEqual(true);
           expect(wrapper.contains(<input name="editor" type="checkbox" checked={user.editor}/>)).toEqual(true);
       })
    });
});