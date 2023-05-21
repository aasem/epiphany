import React from 'react';
import './styles/App.css'; // Global styles
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import MainArea from './components/MainArea';

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