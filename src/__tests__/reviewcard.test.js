import React from 'react';
import {shallow, mount} from 'enzyme';
import ReviewCard from '../components/collapsablecard'

const testSubmission = {
    id: 777777,
    title: 'Title of Submission',
    author: 'Rea Roos',
    submitted: '2018-01-01',
    publication: 'Journal 1',
    status: 'pending',
    url: '#',
    file: "http://damnthecaesars.org/pdfs/spicer-extracts.pdf",
    reviewerInfo: {
        decision: 'pending',
        recommendation: 'none',
        lastAction: '2018-01-01',
        comments: [
            {name: 'Betty Brown', date: '2018-03-04 21:12', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, dolorem doloremque doloribus eius eos error fugit id, inventore minus nam nobis porro possimus repellat repellendus repudiandae rerum suscipit velit veritatis?'},
            {name: 'Abe Abrams', date: '2018-03-03 08:30', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, dolorem doloremque doloribus eius eos error fugit id, inventore minus nam nobis porro possimus repellat repellendus repudiandae rerum suscipit velit veritatis?'},
            {name: 'Debbie Douglas', date: '2018-03-03 08:00', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, dolorem doloremque doloribus eius eos error fugit id, inventore minus nam nobis porro possimus repellat repellendus repudiandae rerum suscipit velit veritatis?'}
        ]
    }
};

describe('ReviewCard', () => {
    it('should render without crashing', () => {
        shallow(<ReviewCard submission={testSubmission}/>)
    });
});