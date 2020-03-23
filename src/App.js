import React from 'react';
import logo from './trivia.png';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import Game from './components/Game';
import PlayGameButton from './components/PlayGameButton';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div> */}
      {/* </div> */}
      <Switch>
        <Route path="/game" component={Game} />
      </Switch>
      <PlayGameButton />
    </div>
  );
}
