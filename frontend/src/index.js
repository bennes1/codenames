import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CreateGamePage from './pages/CreateGamePage';
import PlayGamePage from './pages/PlayGamePage';
import WelcomePage from './pages/WelcomePage';

ReactDOM.render((
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/createGame" component={CreateGamePage} />

        // Keep the default file there for now for learning.
        <Route exact path="/test" component={App} />
        <Route path="/*" component={PlayGamePage} />
      </Switch>
    </BrowserRouter>
  ),
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
