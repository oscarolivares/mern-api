import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Button, CardPanel } from 'react-materialize';

import UsersTable from './UsersTable';
import UserAdd from './UsersAdd';

/* Main controls to manage users */
function UsersControls() {
  let LinkStyle = {
    margin: '.4rem'
  };

  return (
    <div className="section">
      <Link to="/users/list" style={LinkStyle}>
        <Button small waves="light" icon="list" tooltip="List" />
      </Link>
      <UserAdd />
    </div>
  );
}

/* Main user view */
export default ({ match }) => {
  return (
    <div className="container section">
      <UsersControls />

      {/* User body, swapable by routes */}
      <CardPanel className="z-depth-3">
        <Switch>
          <Route exact path={match.path} component={UsersTable} />
          <Route path={`${match.path}/list`} component={UsersTable} />
          {/* <Route path={`${match.path}/add`} component={UsersAdd} /> */}
        </Switch>
      </CardPanel>
    </div>
  );
};
