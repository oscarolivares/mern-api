import React from 'react';
import { Modal, Button } from 'react-materialize';

export default function UsersDelete() {
  let btnDeleteStyle = {
    marginRight: '.5rem'
  };

  return (
    <Modal
      header="Delete user"
      trigger={
        <Button className="modal-trigger" flat waves="light" icon="delete" />
      }
      actions={[
        <Button
          waves="green"
          modal="close"
          className="red lighten-1"
          style={btnDeleteStyle}
        >
          DELETE
        </Button>,
        <Button waves="green" modal="close" className="grey">
          CANCEL
        </Button>
      ]}
    >
      <h6>Are you really sure to delete this item?</h6>
    </Modal>
  );
}
