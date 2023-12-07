import React, { useState, useEffect } from 'react';

const BoardManagement = ({ boardId, isOwner, boardMembers, updateMembers }) => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        let timer;
        if(error){
            timer = setTimeout(() => setError(''), 4000); // clear after few secs
        }
        return () => clearTimeout(timer); // clear timer
    })
    const isUserAlreadyMember = (email) => {
        return boardMembers.some(member => member.email === email);
    }

    const handleAddMember = async () => {
        try {

            if(isUserAlreadyMember(email)){
                setError("Member already added to this board!");
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
                updateMembers(); // Update member list on success.
            } else {
                const data = await response.json();
                setError(data.message||'Failed to add member!');
            }
        } catch (err) {
            setError('Error adding member!');
        }
    };

    const handleRemoveMember = async () => {

        try {
            if(boardMembers.some(member => member.is_owner && member.email === email)){
                setError("Cannot remove yourself because you are the owner!");
                return;
            }

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
                const data = await response.json();
                setError(data.message||'Failed to remove member');
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