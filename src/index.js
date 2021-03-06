import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Event from './pages/Event';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/wezoa-events" exact component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/add-event" render={Event} />
      <Route path="/dashboard" component={Dashboard} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);