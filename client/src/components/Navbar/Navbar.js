import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import './Navbar/Navbar_styles.css';
import "bootstrap/dist/css/bootstrap.min.css";

function CustomNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home" className="d-flex align-items-center ml-3">
         <img
           src="/benzene-logo.png"
           width="35"
           height="35"
           className="d-inline-block align-top"
           alt="Logo"
           style={{ marginRight: '10px' }}
         />
         <span style={{ fontSize: '30px'}}><b>double bond</b></span>
       </Navbar.Brand>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto align-items-center">
          <NavDropdown title={
            <div className="d-flex align-items-center">
                <span className="navbar-username" style={{ marginRight: '10px' }}>elevenny12</span>
                <img src="/pfp_icon.png" width="30" className="rounded-circle" alt="profile" />
                <img src="/dropdown.png" width="15" className="ml-3 rounded-circle" alt="profile" />
            </div>
          } 
          id="basic-nav-dropdown" alignRight className="dropdown-menu-dark my-custom-dropdown">
            <NavDropdown.Item href="#profile" style={{width:'165px'}}>Username</NavDropdown.Item>
            <NavDropdown.Item href="#settings">My Account</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
