import React from 'react';
import { Provider } from 'react-redux';
import logo from './trivia.png';
import store from './store/index';
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
        <Provider store={store}>
          <Start />
        </Provider>
      </header>
    </div>
  );
}
