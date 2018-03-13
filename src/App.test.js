import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow, mount} from 'enzyme';


describe.skip('App', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('contains a navbar', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find('Navbar')).toHaveLength(1);
    });

    it.skip('displays landing page if not logged in', () => {
        const wrapper = mount(<App />);
        expect(wrapper.find('Landing')).toHaveLength(1);
    });

    describe.skip('logged in / dashboard', () => {
        const user = {
            first: 'Ima',
            last: 'Maginary',
            email: 'testiddydoo@example.com'
        };
        const wrapper = shallow(<App user={user}/>);
        it('displays dashboard if user is logged in', () => {
            expect(wrapper.find('Dashboard')).toHaveLength(1);
        });

        it('passes the user to the dashboard', () => {
            expect(wrapper.find('Dashboard').prop('user')).toEqual(user);
        })
    });
});

