import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import RegistrationForm from "../forms/registration-form/registrationform";
import Navbar from "../navbar/index";
import "./landing.css";
import editorInfoImage from './assets/letter_cat.png';
import previewImage from './assets/preview_placeholder.png'

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
                        <h3 className="landing__hero__subtitle">Accept, review, and manage your journal or magazine's submissions</h3>
                        <button className="landing__hero__scroll__button landing__hero__scroll__signup" onClick={() => scrollTo("signup")}>Join</button>
                        <button className="landing__hero__scroll__button landing__hero__scroll__more" onClick={() => scrollTo("editor-info")}>Learn more</button>
                        <div className="landing__hero__color__image"/>
                    </div>
                </header>
                <section id="editor-info" className="editor-info">
                    <div className="editor-info__wrapper">
                        <div className="editor-info__body">
                            <h3>Streamline your review process</h3>
                            <ul>
                                <li>View documents on the cloud, with nothing to download</li>
                                <li>Collaborate with your editorial team with real-time comments</li>
                                <li>Assign and track statuses throughout your internal review</li>
                                <li>Automatically notify submitters once a final decision is made</li>
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