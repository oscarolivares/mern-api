import React from 'react';
import { Modal, Button, TextInput, Row, Col } from 'react-materialize';
import { toast } from 'materialize-css';
/* import axios from 'axios'; */

const usersAPI = 'http://192.168.0.114:3000/api/v1/users';

class UserEditForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
  }

  handleFirstNameChange(e) {
    this.props.onFirstNameChange(e.target.value);
  }

  handleLastNameChange(e) {
    this.props.onLastNameChange(e.target.value);
  }

  render() {
    return (
      <Row>
        <Col>
          <TextInput
            label="First Name"
            value={this.props.firstname}
            onChange={this.handleFirstNameChange}
          />
        </Col>
        <Col>
          <TextInput
            label="Last Name"
            value={this.props.lastname}
            onChange={this.handleLastNameChange}
          />
        </Col>
      </Row>
    );
  }
}

export default class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.firstname,
      lastname: this.props.lastname
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFirstNameChange(value) {
    this.setState({
      firstname: value
    });
  }

  handleLastNameChange(value) {
    this.setState({
      lastname: value
    });
  }

  handleSubmit() {
    const data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname
    };

    fetch(`${usersAPI}/${this.props._id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(
        result => {
          toast({
            html:
              '<i class="material-icons" style="margin-right: .4rem">thumb_up</i> User was updated',
            classes: 'blue lighten-1'
          });
          this.props.onEditUser(this.props._id, data);
          console.log(result);
        },
        error => {
          toast({
            html:
              '<i class="material-icons" style="margin-right: .4rem">thumb_down</i> User was not updated',
            classes: 'pink accent-2'
          });
          console.log(error);
        }
      );
  }

  // With axios
  /* handleSubmit() {
    axios
      .patch(`${usersAPI}/${this.props._id}`, {
        firstname: 'Fred',
        lastname: 'Flintstone'
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  } */

  render() {
    const btnSaveStyle = {
      marginRight: '.5rem'
    };

    return (
      <Modal
        header="Edit user"
        trigger={
          <Button className="modal-trigger" flat waves="light" icon="edit" />
        }
        actions={[
          <Button
            waves="green"
            modal="close"
            style={btnSaveStyle}
            onClick={this.handleSubmit}
          >
            SAVE
          </Button>,
          <Button waves="green" modal="close" className="grey">
            CANCEL
          </Button>
        ]}
        children={
          <UserEditForm
            firstname={this.state.firstname}
            lastname={this.state.lastname}
            onFirstNameChange={this.handleFirstNameChange}
            onLastNameChange={this.handleLastNameChange}
          />
        }
      />
    );
  }
}
