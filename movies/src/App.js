import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Movies from './components/Movies';
import Historial from './components/Notificaciones';
import Login from './components/Login';


function App() {
  return (
    <Router>
      <Route exact path="/" component={Login}>
      </Route>
      <Route exact path="/main" component={Movies}>
      </Route>
      <Route path="/notificaciones">
            <Historial/>
          </Route>
    </Router>
    
  );
}

export default App;
