import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './view_board_styles.css'
// import "bootstrap/dist/css/bootstrap.min.css";
//import Navbar from './../Navbar/Navbar.js';
import io from 'socket.io-client';

const DiscussionBoard = ({boardId}) => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [channelMembers, setChannelMembers] = useState([]);
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
                    // console.log("Members:", members);
                    setChannelMembers(members);
                }else{
                    console.error("failed to fetch members");
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
                    console.log('messages:', messages);
                    setMessages(messages.reverse());
                }else{
                    console.error("Failed to fetch messages.");
                }

            } catch (error) {
                console.error("Error on frontend/backend when fetching messages:", error);
            }
        }

        fetchChannelMembers();
        fetchMessages();
    }, [boardId]);

    useEffect( () => {
        const token = localStorage.getItem('token');
        
        socketRef.current = io(`${process.env.REACT_APP_URL_PREFIX}`, {
            query: {token}
        });

        // join a board
        socketRef.current.emit('joinBoard', boardId);
        console.log(`Client attempting to join board: ${boardId}`);

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

    return (
        <div className="d-flex flex-column vh-100">
            {/* <Navbar /> */}
            <Container fluid className="flex-grow-1">
                <Row className="h-100">
                <Col md={2} className="channels-list h-100 p-5">
                    <h3 className="channel-header">Channels</h3>
                    <div className="channel selected-channel">General</div>
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
                                </div>
                            </div>
                        ))}
                        
                        {/* Invisible element at the end */}
                        <div ref={messagesEndRef} /> 

                    </div>
                    <div className="flex-fill">
                        item
                    </div>
                    <Form className="message-input-form">
                        <Form.Group className="d-flex">
                            <Form.Control
                                className="message-textbox"
                                type="text"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <Button variant="primary" onClick={handleSendMessage} className="message-button"><span className="message-button-text"> Send</span></Button>
                        </Form.Group>
                    </Form>
                </Col>

                {/* Right Column: Channel Info */}
                <Col md={3} className="channel-info h-100 p-5">
                    <h3 className="board-title">Channel Members</h3>
                    {/* <p className="board-description">Here is a discussion board. It is generic.</p> */}
                    {/* Add more info here */}
                    <ul>
                        {channelMembers.map(member => (
                            <li key={member.id}>
                                {member.username}
                                {member.email}
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