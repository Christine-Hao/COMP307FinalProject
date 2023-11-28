import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
//import './Navbar/Navbar_styles.css';
import "bootstrap/dist/css/bootstrap.min.css";
import AccountInfoPopup from './AccountInfoPopup.js';

function Navbar_loggedin() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home" className="d-flex align-items-center ml-3 brand-section">
         <img
           src="/benzene-logo.png"
           width="45"
           height="45"
           className="d-inline-block align-top"
           alt="Logo"
           style={{ marginRight: '10px' }}
         />
         <span style = {{ fontSize: '20px', fontFamily: 'Helvetica'}}><b>double bond</b></span>
       </Navbar.Brand>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto align-items-center">
          <NavDropdown title={
            <div className="d-flex align-items-center">
                <span className="navbar-username" style={{ marginRight: '10px' }}>Display Name</span> {/* to do */}
                <AccountInfoPopup />
                <img src="/pfp_icon.png" width="30" className="rounded-circle" alt="profile" style={{ marginRight: '10px' }}/>
                <img src="/dropdown.png" width="15" className="ml-3 rounded-circle" alt="profile" />
            </div>} 
            id="basic-nav-dropdown" alignRight className="dropdown-menu-dark my-custom-dropdown">
              
            <NavDropdown.Item href="#profile" style={{width:'165px'}}>My Workspaces</NavDropdown.Item> {/* links to be implemented */}
            <NavDropdown.Item onClick={handleShowModal}>My Account</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#logout">Sign Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <AccountInfoPopup show={showModal} handleClose={handleCloseModal} />
    </>
  );
}

export default Navbar_loggedin;

