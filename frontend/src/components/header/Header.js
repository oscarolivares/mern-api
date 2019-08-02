import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar /* , NavItem */ } from 'react-materialize';

/* export default () => {
  return (
    <Navbar brand={<a href="/#">LOGO</a>} alignLinks="right">
      <NavItem href="/users">Users</NavItem>
    </Navbar>
  );
}; */

export default () => {
  return (
    <Navbar brand={<Link to="/">LOGO</Link>} alignLinks="right">
      <Link to="/users">User</Link>
    </Navbar>
  );
};
