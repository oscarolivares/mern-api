import React from 'react';
import { Modal, Button } from 'react-materialize';
import { toast } from 'materialize-css';

const usersAPI = 'http://192.168.0.114:3000/api/v1/users';

export default class UserDelete extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteAction = this.handleDeleteAction.bind(this);
  }

  handleDeleteAction() {
    fetch(`${usersAPI}/${this.props._id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(
        result => {
          toast({
            html:
              '<i class="material-icons" style="margin-right: .4rem">thumb_up</i> User was deleted',
            classes: 'blue lighten-1'
          });
          this.props.onDeleteUser(`${this.props._id}`);
          console.log(result);
        },
        error => {
          toast({
            html:
              '<i class="material-icons" style="margin-right: .4rem">thumb_down</i> User was not deleted',
            classes: 'pink accent-2'
          });
          console.log(error);
        }
      );
  }

  render() {
    const btnDeleteStyle = {
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
            onClick={this.handleDeleteAction}
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
}
