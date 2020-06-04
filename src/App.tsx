import React from 'react';

import Copyright from './components/Copyright';
import HomePage from './HomePage'

export default function App() {

  return (
    <div style={{ height: '100vh' }}>
      <div style={{display: 'flex', flexDirection: 'column', minHeight: '100%'}}>
        <div style={{flex: 1}}>
          <HomePage />
        </div>
        <div style={{ padding: '20px' }}>
          <Copyright />
        </div>
      </div>
    </div>
  );
}
