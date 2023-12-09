import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './view_board_styles.css'
import io from 'socket.io-client';
import BoardManagement from './BoardManagement';

const DiscussionBoard = ({boardId}) => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [boardMembers, setBoardMembers] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    
    const [boardName, setBoardName] = useState('');


    const socketRef = useRef();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect( () => {

        const fetchChannelMembers = async() => {
            try{
                const response = await fetch(`${process.env.REACT_APP_URL_PREFIX}${process.env.REACT_APP_MEMBERS_API}/${boardId}`, {
                    method:"GET",
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok){
                    const members = await response.json();
                    // console.log("Board id:", boardId);
                    //console.log("Members:", members);
                    setBoardMembers(members);
                    // set the owner of the page.
                    setIsOwner(members.some(member => member.is_owner && member.id === parseInt(localStorage.getItem('userId'))));
                    //console.log("Current user ID:", parseInt(localStorage.getItem('userId')));
                    //console.log("Is owner? :", members.some(member => member.is_owner && member.id === parseInt(localStorage.getItem('userId'))));
                }else{
                    console.error("failed to fetch members. reload again.");
                }
            }catch(error){
                console.error("Error happens on frontend/backend when fetching members:", error);
            }
        };

        const fetchMessages = async() => {
            try {
                const response = await fetch(`${process.env.REACT_APP_URL_PREFIX}${process.env.REACT_APP_MESSAGES_API}/${boardId}`,
                {
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem('token')}`        
                    }
                });
                if(response.ok){
                    const messages = await response.json();
                    // console.log('messages:', messages);
                    setMessages(messages);
                }else{
                    console.error("Failed to fetch messages. Reload again.");
                }

            } catch (error) {
                console.error("Error on frontend/backend when fetching messages:", error);
            }
        }

        const fetchBoardName = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_URL_PREFIX}${process.env.REACT_APP_BOARDNAME_API}/${boardId}`,
                {
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem('token')}`        
                    }
                });
                const boardData = await response.json();
              if (response.ok) {
                setBoardName(boardData.board_name); // Update based on your actual data structure
              } else {
                console.error('Failed to fetch board details:', boardData.message);
              }
            } catch (error) {
              console.error('Error fetching board details:', error);
            }
          };

        fetchChannelMembers();
        fetchMessages();
        fetchBoardName();
    }, [boardId, isOwner]);

    useEffect( () => {
        const token = localStorage.getItem('token');
        
        socketRef.current = io(`${process.env.REACT_APP_URL_PREFIX}`, {
            query: {token}
        });

        // join a board
        socketRef.current.emit('joinBoard', boardId);
        // console.log(`Client attempting to join board: ${boardId}`);

        // Listen for incoming messages emitted from the server?(Done!)
        socketRef.current.on('newMessage', (newMessage) => {
            setMessages(prevMessages => [...prevMessages, newMessage]);
        });

        return () => {
            socketRef.current.disconnect();
        }
    }, [boardId]);

    const handleSendMessage = () => {

        if (newMessage.trim()) {
            // emit the message to the server
            socketRef.current.emit('message', boardId, newMessage);

            setNewMessage('');
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSendMessage();
    }

    const updateMembers = async() => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL_PREFIX}${process.env.REACT_APP_MEMBERS_API}/${boardId}`,{
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if(response.ok){
                const members = await response.json();
                setBoardMembers(members);
            }
        } catch (error) {
            console.error("Error on frontend/backend when updating members:", error);
        }
    }

    return (
        <div className="d-flex flex-column vh-100 outer-page">
            {/* <Navbar /> */}
            <Container fluid className="flex-grow-1">
                <Row className="h-100">
                <Col md={2} className="channels-list h-100 p-5">
                    <h3>Welcome to <span className="channel-header">{boardName}</span></h3>
                </Col>

                <Col md={7} className="messages-section d-flex flex-column h-100 border-dividers">
                    <p className="channel-title">General</p>
                    
                    <div className="message-list flex-grow-1">

                        {messages.map((msg, index) => (

                            <div className="message" key={index}>
                            <img src="/pfp_icon.png" width="20" className="rounded-circle message-pfp" alt="profile" />
                                <div className="message-content">
                                    <div className="message-header">
                                        {/* set the content to the sender(msg.username) returned from our backend */}
                                        <span className="message-sender">{msg.username}</span>
                                        {/* <span className="messange-time">{msg.time}</span> */}
                                    </div>
                                    {/* also set the content */}
                                    <div className="message-text">{msg.content}</div>
                                    <div className="message-timestamp">{new Date(msg.created_at).toLocaleString()}</div>
                                </div>
                            </div>
                        ))}
                        
                        {/* Invisible element at the end */}
                        <div ref={messagesEndRef} /> 

                    </div>
                    <div className="flex-fill">
                        item
                    </div>
                    <Form className="message-input-form" onSubmit={handleFormSubmit}>
                        <Form.Group className="d-flex">
                            <Form.Control
                                className="message-textbox"
                                type="text"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <Button variant="primary" type="submit" onClick={handleSendMessage} className="message-button"><span className="message-button-text"> Send</span></Button>
                        </Form.Group>
                    </Form>
                </Col>

                {/* Board Management Section */}
                <BoardManagement 
                    boardId={boardId} 
                    isOwner={isOwner} 
                    boardMembers={boardMembers}
                    updateMembers={updateMembers}
                />


                {/* Right Column: Channel Info */}
                <Col md={3} className="channel-info h-100 p-5">
                    <h3 className="board-title">Channel Members</h3>
                    {/* <p className="board-description">Here is a discussion board. It is generic.</p> */}
                    {/* Add more info here */}
                    <ul>
                        {boardMembers.map(member => (
                            <li key={member.id}>
                                <div>{"Username: " + member.username}</div>
                                <div>{"Email: " + member.email}</div>
                            </li> // Adjust later
                        ))}
                    </ul>
                </Col>
                </Row>
            </Container>
        </div>
    );
};

export default DiscussionBoard;