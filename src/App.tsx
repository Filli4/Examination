import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Screen from './Screen';

import OrderDetails from './components/OrderDetails';


const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element= {<Screen />}/>
          <Route path="/OrderDetails" element= {<OrderDetails/>}/>
     
        </Routes>
      </div>
    </Router>
  );
};

export default App;
