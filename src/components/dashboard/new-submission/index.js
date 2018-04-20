import React from 'react';
import SubmissionForm from "../../forms/submission-form/submissionform";
import './submission-form.css';

export default function SubmissionPane(props) {
    return (
        <main className="submission__form">
            <div className="submission__form wrapper">
                <header className="submission__form">
                    <h1>New submission</h1>
                </header>
                <SubmissionForm/>
            </div>
        </main>
    )
}