import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

export default ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={UserList} />
      <Route path={`${match.path}/:id`} component={UserDetail} />
    </Switch>
  );
};

export function UserList({ match }) {
  let id = '24';
  return (
    <main className="Users">
      <h1>User List</h1>
      <Link to={`${match.url}/${id}`}>User detail</Link>
    </main>
  );
}

export function UserDetail({ match }) {
  return (
    <main className="UserDetail">
      <h2>User Detail</h2>
      <h3>Requested User Id: {match.params.id}</h3>
    </main>
  );
}
