import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-materialize';

// Without react-router
/* export default () => {
  return (
    <Navbar brand={<a href="/#">LOGO</a>} alignLinks="right">
      <NavItem href="/users">Users</NavItem>
    </Navbar>
  );
}; */

// With react-router
export default () => {
  return (
    <Navbar
      brand={<Link to="/">React Frontend</Link>}
      alignLinks="right"
      className="teal lighten-1"
    >
      <Link to="/">Home</Link>
      <Link to="/users">User</Link>
    </Navbar>
  );
};
