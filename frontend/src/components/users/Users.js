import React from 'react';
import { CardPanel } from 'react-materialize';

import UsersTable from './UsersTable';

/* Main user view */
export default ({ match }) => {
  return (
    <div className="container section">
      <CardPanel className="z-depth-3">
        <UsersTable />
      </CardPanel>
    </div>
  );
};
