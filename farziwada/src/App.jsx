import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Background from './components/Background';
import AuthModal from './components/AuthModal';
import SectionGetStarted from './components/SectionGetStarted';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import FraudAlerts from './components/FraudAlerts';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'dashboard', 'analytics', or 'alerts'

  const handleLoginClick = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const handleRegisterClick = () => {
    setAuthMode('register');
    setIsAuthModalOpen(true);
  };

  const handleGetStartedClick = () => {
    setCurrentPage('dashboard');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleNavigateTo = (page) => {
    setCurrentPage(page);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <div className="App min-h-screen bg-black">
      {currentPage === 'home' ? (
        <>
          {/* Animated Background */}
          <Background />
          
          {/* Navigation */}
          <NavBar 
            onLoginClick={handleLoginClick}
            onRegisterClick={handleRegisterClick}
          />
          
          {/* Main Content */}
          <main>
            {/* Hero Section */}
            <Hero onGetStartedClick={handleGetStartedClick} />
            
            {/* Get Started Section */}
            <SectionGetStarted />
          </main>
          
          {/* Auth Modal */}
          <AuthModal 
            isOpen={isAuthModalOpen}
            onClose={closeAuthModal}
            defaultMode={authMode}
          />
        </>
      ) : currentPage === 'dashboard' ? (
        <Dashboard onBackToHome={handleBackToHome} onNavigateTo={handleNavigateTo} />
      ) : currentPage === 'analytics' ? (
        <Analytics onBackToHome={handleBackToHome} onNavigateTo={handleNavigateTo} />
      ) : currentPage === 'alerts' ? (
        <FraudAlerts onBackToHome={handleBackToHome} onNavigateTo={handleNavigateTo} />
      ) : null}
    </div>
  );
}

export default App;
