import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
/* import FoodTruckRegister from './components/FoodTruckRegister'; */
import Screen from './Screen';
/* import Api from './api'; */

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element= {<Screen />}/>
      {/*     <Route path="/FoodTruck" element={<FoodTruckRegister />} /> */}
         {/*  <Route path="/Api" element={<Api />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
