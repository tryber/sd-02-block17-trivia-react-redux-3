import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from './pages/Game';
import Start from './pages/Start';
import Configuration from './pages/Configuration';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/" component={Start} />
          <Route path="/configuration" component={Configuration} />
          <Route path="/game" component={Game} />
        </Switch>
      </header>
    </div>
  );
}
