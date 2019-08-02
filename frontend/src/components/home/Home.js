import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { Row, Col, Card } from 'react-materialize';

export default () => {
  return (
    <Row>
      <Col m={6} s={12}>
        <Card
          className="blue-grey darken-1"
          textClassName="white-text"
          title="Users Managment"
          actions={[<Link to="/users">Users</Link>]}
        >
          You can add, edit and delete users.
        </Card>
      </Col>
    </Row>
  );
};
