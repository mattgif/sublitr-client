import React from 'react';
import {shallow} from 'enzyme';

import UserRow from '../components/userrow';

describe('UserRow', () => {
    it('should render without crashing', () => {
       shallow(<UserRow/>);
    });

    it('should be a tr and have td for users\' names, usernames, and a delete button', () => {
        const user = {
            first: 'Rene',
            last: 'Descartes',
            username: 'rdes',
        };
        const wrapper = shallow(<UserRow user={user}/>);
        expect(wrapper.find('tr')).toHaveLength(1);
        for (let field in user ) {
            expect(wrapper.contains(<td>{user[field]}</td>)).toEqual(true);
            expect(wrapper.find('.delete')).toHaveLength(1);
        }
    });

    it('should mark the checkbox if user is an editor', () => {
        const user = {
            first: 'Rene',
            last: 'Descartes',
            username: 'rdes',
            editor: true
        };
        const wrapper = shallow(<UserRow user={user}/>);
        expect(wrapper.contains(<input type="checkbox" name="editor" checked={user.editor}/>)).toEqual(true)
    });
});