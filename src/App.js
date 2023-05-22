import React from 'react';
import './styles/App.css'; // Global styles
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
import MainArea from './components/mainarea/MainArea';

function App() {
  return (
    <div className='app'>
      <div className="app-sidebar">
        <Sidebar />
      </div>
      <div className="app-main">
        <Header />
        <MainArea />
        <Footer />
      </div>
    </div>
  );
}

export default App;