import React from 'react';

import Footer from './components/Footer';
import HomePage from './components/HomePage'

export default function App() {

  return (
    <div style={{ height: '100vh' }}>
      <div style={{display: 'flex', flexDirection: 'column', minHeight: '100%'}}>
        <div style={{flex: 1}}>
          <HomePage />
        </div>
        <div style={{ padding: '20px' }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
