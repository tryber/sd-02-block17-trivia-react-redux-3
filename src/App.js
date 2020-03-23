import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import Game from './components/Game';
import Start from './pages/Start';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
      </header>
      <Switch>
        <Route exact path="/" component={Start} />
        <Route path="/game" component={Game} />
      </Switch>
    </div>
  );
}
