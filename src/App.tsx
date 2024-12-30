
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Screen from './Screen';




const App = () => {
  return (
    <Router>
      
      <div className="app-container">
        <Routes>
          <Route path="/" element= {<Screen />}/>
         
     
        </Routes>
      </div>
    </Router>
  );
};

export default App;
