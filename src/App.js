import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from './pages/Game';
import Start from './pages/Start';
import Configuration from './pages/Configuration';
import Feedback from './pages/Feedback';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Start} />
        <Route path="/configuration" component={Configuration} />
        <Route path="/game" component={Game} />
        <Route path="/feedback" component={Feedback} />
      </Switch>
    </div>
  );
}
