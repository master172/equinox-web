import React, { useState } from 'react';
import Header from "./Comonents/Header"
import Footer from "./Comonents/Footer"
import Home from "./Comonents/Home"
import Events from "./Comonents/Events";
import About from './Comonents/About';
import Help from './Comonents/Help';
import Contact from './Comonents/Contact';
import Registration from './Comonents/Registration';
import IndividualRegistration from './Comonents/IndividualRegistration';
import EventsDataPanel from './Comonents/EventDetails';
import "./Styles/Global.css";
import "./Styles/Themes.css";
import InstitutionRegistration from './Comonents/InstitutionRegistration';

const App = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [theme, setTheme] = useState('gold');
    const [message, setMessage] = useState('');
    const [isMessageVisible, setIsMessageVisible] = useState(false);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'gold' ? 'red' : 'gold');
    };

    const showMessage = (msg) => {
        setMessage(msg);
        setIsMessageVisible(true);
        setTimeout(() => {
            setIsMessageVisible(false);
        }, 3000);
    };

    const renderContent = () => {
        switch (currentPage) {
            case 'home':
                return <Home setCurrentPage={setCurrentPage} theme={theme} />;
            case 'events':
                return <Events showMessage={showMessage} setCurrentPage={setCurrentPage} theme={theme} />;
            case 'registration':
                return <Registration showMessage={showMessage} setCurrentPage={setCurrentPage} theme={theme} />;
            case 'about':
                return <About />;
            case 'contact':
                return <Contact />;
            case 'individual_registration':
                return <IndividualRegistration theme={theme} />;
            case 'event_details':
                return <EventsDataPanel onclick={setCurrentPage} />;
            case 'Institution':
                return <InstitutionRegistration></InstitutionRegistration>
            default:
                return null;
        }
    };

    return (
        <>
            <div className={`app-container theme-${theme}`}>
                <div className={`message-box ${isMessageVisible ? 'show' : ''}`} id="messageBox">
                    {message}
                </div>
                <main className="main-wrapper">
                    <Header setCurrentPage={setCurrentPage} toggleTheme={toggleTheme} theme={theme} />
                    {renderContent()}
                    {currentPage === 'home' && <Footer />}
                </main>
                <div className="background-wrapper">
                    <div className="background-light"></div>
                </div>
            </div>
        </>
    );
};

export default App;
