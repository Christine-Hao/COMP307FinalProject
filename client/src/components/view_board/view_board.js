import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './view_board_styles.css'
// import "bootstrap/dist/css/bootstrap.min.css";
//import Navbar from './../Navbar/Navbar.js';

const formatDateTime = () => {
    var now = new Date();

    var hours = now.getHours();
    var minutes = now.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes + " " + ampm;
};

const DiscussionBoard = () => {
    const [messages, setMessages] = useState([
        { sender: "Professor Vybihal", time: "09:12 AM", text: "I love McGill." },
        { sender: "Johnny", time: "09:18 AM", text: "At what time are we meeting up for coffee?" },
        { sender: "Stephen Leacock", time: "11:15 AM", text: "I hope I will be remembered not as a great father and thinker, but as someone with his name on a dreary building at McGill." }
    ]);

    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const newMsg = {
                sender: "guest",
                time: formatDateTime(),
                text: newMessage
            };
            setMessages([...messages, newMsg]);
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
                                        <span className="message-sender">{msg.sender}</span>
                                        {/* <span className="messange-time">{msg.time}</span> */}
                                    </div>
                                    <div className="message-text">{msg.text}</div>
                                </div>
                            </div>
                        ))}
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
                    <h3 className="board-title">My Discussion Board</h3>
                    <p className="board-description">Here is a discussion board. It is generic.</p>
                    {/* Add more info here */}
                </Col>
                </Row>
            </Container>
        </div>
    );
};

export default DiscussionBoard;