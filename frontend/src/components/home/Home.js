import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import {
  Row,
  Col,
  Collection,
  CollectionItem,
  Icon
} from 'react-materialize';

export default () => {
  return (
    <Row>
      <Col s={12} m={8} l={5}>
        <Collection header="Avaible Resources">
          <CollectionItem>
            Manage Users
            <Link to="/users" className="secondary-content">
              <Icon>send</Icon>
            </Link>
          </CollectionItem>
          <CollectionItem>
            Undefined
            <Link to="#" className="secondary-content">
              <Icon>send</Icon>
            </Link>
          </CollectionItem>
        </Collection>
      </Col>
    </Row>
  );
};
