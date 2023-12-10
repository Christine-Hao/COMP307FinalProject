import React from 'react';
import { Button } from 'react-bootstrap';
import './Navbar_styles.css';

function Navbar_loggedin({ handleLogout, handleWorkspacesClick }) {
  return (
    <div className="outer-navbar">
      <div className="site-nav">
        <div className="site-nav-header">
          <div className="site-nav-brand">
            <img
              src="/benzene-logo.png"
              width="45"
              height="45"
              className="d-inline-block align-top nav-logo-img"
              alt="Logo"
            />
            <span className="brand-text">double bond</span>
          </div>
        </div>
      <div className="site-nav-buttons">
        <Button variant="outline-primary" onClick={handleWorkspacesClick}>Discussion Boards</Button>{' '}
        <Button variant="outline-danger" onClick={handleLogout}>Log out</Button>
      </div>
    </div>
  </div>

);
}


export default Navbar_loggedin;