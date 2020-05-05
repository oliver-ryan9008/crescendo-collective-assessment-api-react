import React from 'react';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Home />
    </React.Fragment>
  );
}

export default App;
