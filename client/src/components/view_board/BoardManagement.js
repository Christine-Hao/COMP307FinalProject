import React, { useState } from 'react';

const BoardManagement = ({ boardId, isOwner, updateMembers }) => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleAddMember = async () => {
        try {

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
                updateMembers(); // Update member list on success.
            } else {
                setError('Failed to add member');
            }
        } catch (err) {
            setError('Error adding member');
        }
    };

    const handleRemoveMember = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL_PREFIX}${process.env.REACT_APP_DELETEFROMBOARD_API}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ boardID: boardId, userEmail: email })
            });

            if (response.ok) {
                setEmail('');
                updateMembers(); // Update member list on success...
            } else {
                setError('Failed to remove member');
            }
        } catch (err) {
            setError('Error removing member');
        }
    };

    if (!isOwner) return null; // Hide if not owner ?

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter user email"
            />
            <button onClick={handleAddMember}>Add Member</button>
            <button onClick={handleRemoveMember}>Remove Member</button>
        </div>
    );
};

export default BoardManagement;