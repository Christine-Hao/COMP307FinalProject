import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './Navbar_styles.css';

function Navbar_loggedin({ handleLogout, handleWorkspacesClick }) {
  return (
    <div className="custom-nav">
  <input type="checkbox" id="nav-check" className="custom-nav-check" />
  <div className="custom-nav-header">
    <div className="custom-nav-title">
      <img
        src="/benzene-logo.png"
        width="45"
        height="45"
        className="d-inline-block align-top"
        alt="Logo"
        style={{ marginRight: '10px' }}
      />
      <span style={{ fontSize: '20px'}}><b>double bond</b></span>
    </div>
  </div>
  <div className="custom-nav-btn">
    <label htmlFor="nav-check" className="custom-nav-btn-label">
      <span className="custom-nav-btn-span"></span>
      <span className="custom-nav-btn-span"></span>
      <span className="custom-nav-btn-span"></span>
    </label>
  </div>
  
  <div className="custom-nav-links nav-dropdown">
      <div className="dropdown-toggle">
          <span className="navbar-username" >My Account</span>
          <img src="/pfp_icon.png" width="30" className="rounded-circle" alt="profile" style={{ marginRight: '10px' }}/>
          <img src="/dropdown.png" width="15" className="rounded-circle" alt="dropdown" />
      </div>
      <div className="dropdown-menu">
          <a className="dropdown-item" href="" onClick={handleWorkspacesClick}>My Discussion Boards</a>
          <a className="dropdown-item" href="" onClick={handleLogout}>Sign Out</a>
      </div>
  </div>
</div>

);
}


export default Navbar_loggedin;