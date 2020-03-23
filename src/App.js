import React from 'react';
// import logo from './trivia.png';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Start from './pages/Start';
import Game from './components/Game';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div> */}
      {/* </div> */}
      <Switch>
        <Route exact path="/" component={Start} />
        <Route path="/game" component={Game} />
      </Switch>
    </div>
  );
}
