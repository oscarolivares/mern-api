import React from 'react';
import { Table } from 'react-materialize';

import UsersEdit from './UsersEdit';
import UsersDelete from './UsersDelete';

const usersAPI = 'http://192.168.0.114:3000/api/v1/users';

// Get users from server
function getUsersList() {
  const init = {
    method: 'GET',
    mode: 'cors'
  };

  const request = new Request(usersAPI, init);

  fetch(request)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.log('on else');
      }
    })
    .then(data => {
      console.log(data[0]);
    })
    .catch(error => {
      console.log(error);
    });
}

/* Rows for user table */
function UsersTableRows(props) {
  getUsersList();

  return (
    <tr>
      <td>554ed928f33c4</td>
      <td>Alvin</td>
      <td>Eclair</td>

      {/* Actions */}
      <td>
        <UsersEdit />
        <UsersDelete />
      </td>
    </tr>
  );
}

/* List of users */
function UsersTable() {
  return (
    <Table striped centered>
      <thead>
        <tr>
          <th data-field="_id">ID</th>
          <th data-field="firstname">First Name</th>
          <th data-field="lastname">Last Name</th>
          <th data-field="actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <UsersTableRows />
        {/* <UsersTableRows />
        <UsersTableRows /> */}
      </tbody>
    </Table>
  );
}

export default UsersTable;
