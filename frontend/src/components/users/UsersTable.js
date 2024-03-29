import React from 'react';
import { Table, Preloader } from 'react-materialize';

import UserAdd from './UserAdd';
import UserEdit from './UserEdit';
import UserDelete from './UserDelete';
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
        <UserEdit
          _id={props.user._id}
          firstname={props.user.firstname}
          lastname={props.user.lastname}
          onEditUser={props.onEditUser}
        />
        <UserDelete _id={props.user._id} onDeleteUser={props.onDeleteUser} />
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

    this.handleReloadListForAdd = this.handleReloadListForAdd.bind(this);
    this.handleReloadListForEdit = this.handleReloadListForEdit.bind(this);
    this.handleReloadListForDelete = this.handleReloadListForDelete.bind(this);
  }

  handleReloadListForAdd(data) {
    const newUsersArray = this.state.users;
    newUsersArray.push(data);

    this.setState({
      users: newUsersArray
    });
  }

  handleReloadListForEdit(_id, data) {
    const newUsersArray = this.state.users.map(user => {
      if (user._id === _id) {
        user.firstname = data.firstname;
        user.lastname = data.lastname;
      }
      return user;
    });
    this.setState({
      users: newUsersArray
    });
  }

  handleReloadListForDelete(_id) {
    const newUsersArray = this.state.users.filter(user => user._id !== _id);
    this.setState({
      users: newUsersArray
    });
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
      return (
        <div className="center">
          <Preloader />
        </div>
      );
    } else {
      rows.push(
        users.map(user => (
          <UsersTableRows
            user={user}
            key={user._id}
            onDeleteUser={this.handleReloadListForDelete}
            onEditUser={this.handleReloadListForEdit}
          />
        ))
      );

      return (
        <>
          <UserAdd onAddUser={this.handleReloadListForAdd} />
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
        </>
      );
    }
  }
}

export default UsersTable;
