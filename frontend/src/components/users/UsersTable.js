import React from 'react';
import { Table } from 'react-materialize';

import UsersEdit from './UsersEdit';
import UsersDelete from './UsersDelete';
import './UsersTable.css';

const usersAPI = 'http://192.168.0.114:3000/api/v1/users';

/* Rows for user table */
function UsersTableRows(props) {
  return (
    <tr>
      <td className="hidden-sm">{props.user._id}</td>
      <td>{props.user.firstname}</td>
      <td>{props.user.lastname}</td>

      {/* Actions */}
      <td>
        <UsersEdit />
        <UsersDelete />
      </td>
    </tr>
  );
}

// User table
class UsersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: []
    };
  }

  componentDidMount() {
    fetch(usersAPI, { method: 'GET', mode: 'cors' })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            users: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, users } = this.state;
    const rows = [];

    if (error) {
      return <div>Conexion problem. Please try again later</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      rows.push(
        users.map(user => <UsersTableRows user={user} key={user._id} />)
      );

      return (
        <Table striped centered>
          <thead>
            <tr>
              <th data-field="_id" className="hidden-sm">
                ID
              </th>
              <th data-field="firstname">First Name</th>
              <th data-field="lastname">Last Name</th>
              <th data-field="actions">Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      );
    }
  }
}

export default UsersTable;
