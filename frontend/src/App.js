import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import 'materialize-css/dist/css/materialize.min.css';

import Header from './components/header/Header';
import Users from './components/users/Users';

function MainRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={''} />
      <Route path="/users" component={Users} />
      <Route component={NoMathch} />
    </Switch>
  );
}

function NoMathch({ location }) {
  return <h3>Sorry, the requested url is invalid</h3>;
}

function App() {
  return (
    <>
      <Header />
      <MainRoutes />
    </>
  );
}

export default App;
