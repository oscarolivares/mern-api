import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

import Home from './components/home/Home';
import Users from './components/users/Users';
import Header from './components/header/Header';

function RouteNotFound({ location }) {
  return <h3>Sorry, the requested url is invalid</h3>;
}

function Main() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={Users} />
      <Route component={RouteNotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
