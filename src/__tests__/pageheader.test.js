import React from 'react';
import {shallow} from 'enzyme';
import PageHeader from '../components/pageheader';

describe('PageHeader', () => {
    it('should render without crashing', () => {
        shallow(<PageHeader/>);
    });

    it('should have a header element with h1 title', () => {
        const title = 'Foo';
        const wrapper = shallow(<PageHeader title={title} />);
        expect(wrapper.contains(<header><h1>{title}</h1></header>)).toEqual(true);
    });

    it('should have a subtitle, if provided', () => {
        const title = 'Foo';
        const subtitle = 'Bar';
        const wrapper = shallow(<PageHeader title={title} subtitle={subtitle}/>);
        expect(wrapper.contains(<h2>{subtitle}</h2>)).toEqual(true);
    });

    it('should not have a subtitle if one is not provided', () => {
        const title = 'Foo';
        const wrapper = shallow(<PageHeader title={title} />);
        expect(wrapper.contains(<h2></h2>)).toEqual(false);
    })

});
