import React from 'react';
import { Modal, Button, TextInput, Row, Col } from 'react-materialize';

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
    console.log(`${usersAPI}/${this.props._id}`);
    /* fetch(`${usersAPI}/${this.props._id}`, {
      method: 'PATCH',
      mode: 'cors',
      body: {
        firstname: this.state.firstname,
        lastname: this.state.lastname
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }); */
    fetch(`${usersAPI}/${this.props._id}`, {
      method: 'PATCH',
      body: {
        firstname: 'hola'
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
      });
  }

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
