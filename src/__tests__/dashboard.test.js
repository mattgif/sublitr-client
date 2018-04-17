import React from 'react';
import {shallow} from 'enzyme';

import {Dashboard} from '../components/dashboard/dashboard';

const user = {
    firstName: 'Test',
    lastName: 'User',
    admin: true,
    editor: true
};

describe('Dashboard', () => {
    it('should render without failing', () => {
        shallow(<Dashboard user={user} active={'submissions'}/>);
    });
});