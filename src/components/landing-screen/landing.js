import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import RegistrationForm from "../forms/registration-form/registrationform";
import Navbar from "../navbar/index";
import "./landing.css";
import previewImage from './assets/preview_placeholder.png'

const submitterInfoImage = 'https://s3.amazonaws.com/sublitr-images/letter_cat.png';
const editorInfoImage = 'https://s3.amazonaws.com/sublitr-images/cat_writing.png';

export default function Landing() {
    const scrollTo = sectionId => {
        const scrollToSection = document.getElementById(sectionId);
        scrollToSection.scrollIntoView()
    };
    return (
        <Router>
            <div className="App">
                <Navbar/>
                <header role="banner" className="landing__hero">
                    <div className="landing__hero__wrapper">
                        <h1 className="landing__hero__title">Submissions simplified</h1>
                        <h3 className="landing__hero__subtitle">Receive. Review. Decide.</h3>
                        <button className="landing__hero__scroll__button landing__hero__scroll__signup" onClick={() => scrollTo("signup")}>Sign up</button>
                        <button className="landing__hero__scroll__button landing__hero__scroll__more" onClick={() => scrollTo("info")}>Learn more</button>
                        <div className="landing__hero__color__image"/>
                    </div>
                </header>
                <section id="info" className="info">
                    <section className="submitter-info" id="submitter-info">
                        <div className="submitter-info__wrapper">
                            <div className="submitter-info__body">
                                <h3>Receive</h3>
                                <p>Submitters and editors can manage and track submissions for multiple publications.</p>
                            </div>
                            <div className="submitter-info__image">
                                <img src={submitterInfoImage} alt="cat writing letters"/>
                            </div>
                        </div>
                    </section>
                    <section id="editor-info" className="editor-info">
                        <div className="editor-info__wrapper">
                            <div className="editor-info__body">
                                <h3>Review</h3>
                                <ul>
                                    <li>Review documents on the cloud</li>
                                    <li>Add comments and recommendations</li>
                                    <li>We'll let submitters know when you've made a decision</li>
                                </ul>
                            </div>
                            <div className="editor-info__image">
                                <img src={editorInfoImage} alt="cat carrying letters"/>
                            </div>
                        </div>
                    </section>
                    <section className="app-preview">
                        <div className="app-preview__wrapper">
                            <h2>Submission info at a glance</h2>
                            <p>Access your submission info any time from your Mac, PC, tablet or phone.</p>
                            <div className="app-preview__image">
                                <img src={previewImage} alt="sublitr app on phone, pc, and tablet"/>
                            </div>
                        </div>
                    </section>
                </section>
                <section id="signup" className="signup">
                    <div className="signup__wrapper">
                        <h3>Join sublitr</h3>
                        <RegistrationForm/>
                    </div>
                </section>
            </div>
        </Router>
    )
}