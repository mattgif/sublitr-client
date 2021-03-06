import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import RegistrationForm from "../forms/registration-form/registrationform";
import Navbar from "../navbar/index";
import "./landing.css";

const submitterInfoImage = 'https://s3.amazonaws.com/sublitr-images/cat_with_box.png';
const decideImage = 'https://s3.amazonaws.com/sublitr-images/letter_cat.png';
const editorInfoImage = 'https://s3.amazonaws.com/sublitr-images/cat_writing.png';
const previewImage = 'https://s3.amazonaws.com/sublitr-images/preview.png';

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
                <section className="demoInfo">
                    <h4>Demo logins ( pw: <em>testpassword</em> ):</h4>
                    <ul>
                        <li>User account: demouser@example.com</li>
                        <li>Editor account: demoeditor@example.com</li>
                        <li>Admin account: demoadmin@example.com</li>
                    </ul>
                </section>
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
                                </ul>
                            </div>
                            <div className="editor-info__image">
                                <img src={editorInfoImage} alt="cat carrying letters"/>
                            </div>
                        </div>
                    </section>
                    <section className="decide-info">
                        <div className="decide-info__wrapper">
                            <div className="decide-info__body">
                                <h3>Decide</h3>
                                <p>We'll automatically notify submitters when you've made your final decision.</p>
                            </div>
                            <div className="decide-info__image">
                                <img src={decideImage} alt="owl and cat in rowboat"/>
                            </div>
                        </div>
                    </section>
                </section>
                <section className='app-preview'>
                    <div className='app-preview__wrapper'>
                        <h3>Your submissions, on any device</h3>
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