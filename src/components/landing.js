import React from 'react';
import PageHeader from "./pageheader";
import RegistrationForm from "./registrationform";

export default function Landing(props) {
    return (
        <div>
            <PageHeader title="sublitr" subtitle="submissions simplified"/>
            <section>
                <h3>Accept, review, and manage submissions</h3>
                <p>Reduce administrative workload, and focus on finding quality content for your journal or magazine.</p>
                <p>[<strong>Placeholder for image of journal submission interface</strong>]</p>
                <p>sublitr simplifies the flow of the submission process.</p>
                <ul>
                    <li>Automatically open and close submission windows, and notify writers about approaching deadlines</li>
                    <li>Track submissions through the selection process</li>
                    <li>Collaborate with your review team with in-app viewing and comments</li>
                    <li>Notify submitters with customizable feedback</li>
                </ul>
            </section>
            <section>
                <h3>Get your work out there</h3>
                <p>sublitr makes it easy to submit your work to the journals and magazines you love.</p>
                <p>[<strong>Placeholder for image of user submission interface</strong>]</p>
                <ul>
                    <li>Submit to multiple journals, magazines, and contests with the click of a button</li>
                    <li>Always have the latest information on your submission's status</li>
                </ul>
            </section>
            <section>
                <h3>Join sublitr</h3>
                <RegistrationForm/>
            </section>
        </div>
    )
}