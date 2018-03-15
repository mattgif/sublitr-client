export const testingState = {
    user: {first: "Betty", last: "Brown", email: "bbrown@example.com", editor: true},
    dashboard: {activeTab: 'submissions'},
    activeSubmission: {
        title: 'Title of Submission',
        author: 'Rea Roos',
        submitted: '2018-01-01',
        publication: 'Journal 1',
        status: 'pending',
        url: '#',
        file: "../dummy/test_pdf.pdf",
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
    },
    statusLists: {
        decision: [
            {
                short: 'pending',
                long: 'No decision'
            },
            {
                short: 'revise',
                long: 'Revise & resubmit'
            },
            {
                short: 'accepted',
                long: 'Accepted'
            },
            {
                short: 'declined',
                long: 'Declined'
            }
        ],
        recommendation: [
            {
                short: 'none',
                long: 'Not reviewed'
            },
            {
                short: 'underReview',
                long: 'Under review'
            },
            {
                short: 'accept',
                long: 'Accept'
            },
            {
                short: 'revise',
                long: 'Revise & Resubmit'
            },
            {
                short: 'consider',
                long: 'Consider'
            },
            {
                short: 'decline',
                long: 'Decline'
            }
        ]
    },
    publications: [
        {name: 'Journal 1', abbr: 'J1'},
        {name: 'Journal 2', abbr: 'J2'},
        {name: 'Magazine 1', abbr: 'M1'},
        {name: 'Magazine 2', abbr: 'M2'}
    ],
    filterValues: {
        recommendationFilter: ["all"],
        publicationFilter: "all",
        decisionFilter: "all",
        userFilter: "all"
    },
    submissions: [
        {
            title: 'Demo title 1',
            author: 'Rea Roos',
            submitted: '2018-01-01',
            publication: 'Journal 1',
            status: 'pending',
            url: '#',
            file: '',
            reviewerInfo: {
                decision: 'pending',
                recommendation: 'none',
                lastAction: '2018-01-01'
            }
        },
        {
            title: 'Demo title 2',
            author: 'Kylie Keegan',
            submitted: '2018-01-01',
            publication: 'Journal 1',
            status: 'declined',
            url: '#',
            file: '',
            reviewerInfo: {
                decision: 'declined',
                recommendation: 'decline',
                lastAction: '2018-01-01'
            }
        },
        {
            title: 'Demo title 3',
            author: 'Emanuel Eisenstein',
            submitted: '2018-01-01',
            publication: 'Magazine 1',
            status: 'declined',
            url: '#',
            file: '',
            reviewerInfo: {
                decision: 'declined',
                recommendation: 'consider',
                lastAction: '2018-01-01'
            }
        },
        {
            title: 'Demo title 4',
            author: 'Emanuel Eisenstein',
            submitted: '2018-01-01',
            publication: 'Journal 2',
            status: 'accepted',
            url: '#',
            file: '',
            reviewerInfo: {
                decision: 'accepted',
                recommendation: 'accept',
                lastAction: '2018-01-01'
            }
        },
        {
            title: 'Demo title 5',
            author: 'Donna Delapaz',
            submitted: '2018-01-01',
            publication: 'Magazine 1',
            status: 'revise',
            url: '#',
            file: '',
            reviewerInfo: {
                decision: 'revise',
                recommendation: 'revise',
                lastAction: '2018-01-01'
            }
        },
        {
            title: 'Demo title ',
            author: 'Ashanti Ables',
            submitted: '2018-01-01',
            publication: 'Magazine 2',
            status: 'pending',
            url: '#',
            file: '',
            reviewerInfo: {
                decision: 'pending',
                recommendation: 'underReview',
                lastAction: '2018-01-01'
            }
        },
    ],
    users: [
        {first: "Abe", last: "Abrams", email: "aabrams@example.com", editor: false},
        {first: "Betty", last: "Brown", email: "bbrown@example.com", editor: true},
        {first: "Charlie", last: "Chaplin", email: "cchaps@example.com", editor: true},
        {first: "Debbie", last: "Douglas", email: "ddougs@example.com", editor: false},
    ],
    showSidebar: false,
    modal: {
        show: false,
        type: undefined,
        buttons: []
    }
};