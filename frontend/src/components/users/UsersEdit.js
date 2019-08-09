import React from 'react';
import { Modal, Button, TextInput, Row, Col } from 'react-materialize';

function UsersEditForm() {
  return (
    <Row>
      <Col>
        <TextInput label="First Name" />
      </Col>
      <Col>
        <TextInput label="Last Name" />
      </Col>
    </Row>
  );
}

export default function UsersEdit() {
  let btnSaveStyle = {
    marginRight: '.5rem'
  };

  return (
    <Modal
      header="Edit user"
      trigger={
        <Button className="modal-trigger" flat waves="light" icon="edit" />
      }
      actions={[
        <Button waves="green" modal="close" style={btnSaveStyle}>
          SAVE
        </Button>,
        <Button waves="green" modal="close" className="grey">
          CANCEL
        </Button>
      ]}
      children={<UsersEditForm />}
    />
  );
}
