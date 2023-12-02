import Modal from 'react-bootstrap/Modal';
import './Navbar_styles.css';
import React from 'react';

function AccountInfoPopup({ show, handleClose }) {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        style={{ opacity: 1 }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{fontSize: '30px', marginLeft: '5px' }}> Account Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
              <div className="form-group">
                <label htmlFor="display-name" style={{ color: "black"}}>Display name</label>
                <input type="text" className="form-control-lg" id="display-name" defaultValue="Eleftheri V." disabled/>
              </div>
              <div className="form-group">
                <label htmlFor="name" style={{ color: "black"}}>Legal name</label>
                <input type="text" className="form-control-lg" id="name" defaultValue="Eleftherios Venizelos" disabled/>
                <div class="form-text account-text-info" style={{ fontSize: "15px" }}>Your legal name cannot be updated.</div>
              </div>
              <div className="form-group" style={{ color: "black"}}>
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control-lg" id="email" defaultValue="elef.venizelos@gmail.com" disabled/>
                <div class="form-text account-text-info" style={{ fontSize: "15px" }}>Your email cannot be updated.</div>
              </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AccountInfoPopup;