import React from 'react';
import { Modal, Button, TextInput, Row, Col } from 'react-materialize';
import { toast } from 'materialize-css';

const usersAPI = 'http://192.168.0.114:3000/api/v1/users';

class UserAddForm extends React.Component {
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

export default class UserAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: ''
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

    fetch(usersAPI, {
      method: 'POST',
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
              '<i class="material-icons" style="margin-right: .4rem">thumb_up</i> User was added',
            classes: 'blue lighten-1'
          });
          this.props.onAddUser(result);
          this.setState({
            firstname: '',
            lastname: ''
          });
          console.log(result);
        },
        error => {
          toast({
            html:
              '<i class="material-icons" style="margin-right: .4rem">thumb_down</i> User was not added',
            classes: 'pink accent-2'
          });
          console.log(error);
        }
      );
  }

  render() {
    return (
      <Modal
        header="Create a new user"
        trigger={<Button small waves="light" icon="add" tooltip="Add" />}
        actions={[
          <Button
            waves="green"
            modal="close"
            style={{ marginRight: '.5rem' }}
            onClick={this.handleSubmit}
          >
            SAVE
          </Button>,
          <Button waves="green" modal="close" className="grey">
            CANCEL
          </Button>
        ]}
        children={
          <UserAddForm
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
