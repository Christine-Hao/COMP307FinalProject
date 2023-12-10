import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './view_board_styles.css'


const BoardManagement = ({ boardId, isOwner, boardMembers, updateMembers }) => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        let timer;
        if(error){
            timer = setTimeout(() => setError(''), 4000);
        }
        return () => clearTimeout(timer);
    })
    const isUserAlreadyMember = (email) => {
        return boardMembers.some(member => member.email === email);
    }

    const handleAddMember = async () => {
        try {

            if(isUserAlreadyMember(email)){
                setError("This user is already a member of this board.");
                return;
            }

            const response = await fetch(`${process.env.REACT_APP_URL_PREFIX}${process.env.REACT_APP_ADDTOBOARD_API}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ boardID: boardId, userEmail: email })
            });

            if (response.ok) {
                setEmail('');
                updateMembers();
            } else {
                const data = await response.json();
                setError(data.message||'Failed to add member.');
            }
        } catch (err) {
            setError('Error adding member!');
        }
    };

    const handleRemoveMember = async () => {

        try {
            if(boardMembers.some(member => member.is_owner && member.email === email)){
                setError("A board owner cannot be removed as member.");
                return;
            }

            const response = await fetch(`${process.env.REACT_APP_URL_PREFIX}${process.env.REACT_APP_DELETEFROMBOARD_API}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ boardID: boardId, userEmail: email })
            });

            if (response.ok) {
                setEmail('');
                updateMembers();
            } else {
                const data = await response.json();
                setError(data.message||'Failed to remove member');
            }
        } catch (err) {
            setError('Error removing member');
        }
    };

    // Hide if not owner
    if (!isOwner) return null;

    return (
        <div>
            {/* <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter user email"
            /> */}
            <div className="rounded-box">
                <h3 className="board-title">Membership Management</h3>
                <p className="text-in-rounded">Enter the email of a user you wish to add or remove.</p>
                {error && <p className="error-message">Error: {error}</p>}
                <Form className="define-user-form">
                    <Form.Group className="d-flex">
                        <Form.Control
                            className="define-user-textbox"
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter user email"
                        />
                    </Form.Group>
                </Form>
                <Button variant="primary" className="define-user-button" size="md" onClick={handleAddMember}>
                    Add Member
                </Button>{' '}
                <Button variant="secondary" className="define-user-button" size="md" onClick={handleRemoveMember}>
                Remove Member
                </Button>
            </div>
        </div>
    );
};

export default BoardManagement;