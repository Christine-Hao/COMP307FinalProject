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
                <label htmlFor="display-name">Display name</label>
                <input type="text" className="form-control-lg" id="display-name" defaultValue="Eleftheri V." disabled/>
                <div class="form-text">Display name to be updateable later maybe</div>
              </div>
              <div className="form-group">
                <label htmlFor="name">Legal name</label>
                <input type="text" className="form-control-lg" id="name" defaultValue="Eleftherios Venizelos" disabled/>
                <div class="form-text">Your legal name cannot be updated.</div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control-lg" id="email" defaultValue="elef.venizelos@gmail.com" disabled/>
                <div class="form-text">Your email cannot be updated.</div>
              </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AccountInfoPopup;