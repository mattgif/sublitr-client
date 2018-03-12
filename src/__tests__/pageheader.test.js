import React from 'react';
import {shallow} from 'enzyme';
import PageHeader from '../components/pageheader';

describe('PageHeader', () => {
    it('should render without crashing', () => {
        shallow(<PageHeader/>);
    });

    it('should be a header', () => {
        const wrapper = shallow(<PageHeader/>);
        expect(wrapper.find('header')).toHaveLength(1);
    });

    it('should have an h1 title', () => {
        const title = 'Foo';
        const wrapper = shallow(<PageHeader title={title} />);
        expect(wrapper.contains(<h1>{title}</h1>)).toEqual(true);
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
