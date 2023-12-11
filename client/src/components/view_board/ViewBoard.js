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
                    // console.log("Members:", members);
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
                setBoardName(boardData.board_name);
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

        // proceed when board Id exists.
        if (!boardId) return;

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
            if(socketRef.current){
                socketRef.current.disconnect();
                socketRef.current = null;
            }
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
        <div className="d-flex outer-viewboard-page text-white">
    <Container fluid className="flex-grow-1">
        <Row className="h-100">
            <Col lg={2} md={3} sm={12} className="channels-list p-5">
                <div className="rounded-box">
                    <h3>Welcome to</h3>
                    <h3 className="left-board-header ">{boardName}</h3>
                </div>
            </Col>

            <Col lg={7} md={6} sm={12} className="messages-section d-flex message-section-height border-dividers">
                <p className="left-board-title">General Chat</p>

                <div className="message-list flex-grow-1">
                    {messages.length === 0 ? (
                        <p className="empty-chat-message">This chat is empty - send the first message!</p>
                    ) : (
                        messages.map((msg, index) => (
                            <div className="message" key={index}>
                                <img src="/pfp_icon.png" width="20" className="rounded-circle message-pfp" alt="profile" />
                                <div className="message-content">
                                    <div className="message-header">
                                        <span className="message-sender">{msg.username}</span>
                                        <div className="message-timestamp">
                                            {new Date(msg.created_at).toLocaleString(undefined, { 
                                                year: 'numeric', 
                                                month: 'numeric', 
                                                day: 'numeric', 
                                                hour: '2-digit', 
                                                minute: '2-digit',
                                                hour12: true,
                                                hourCycle: 'h12'
                                            })}
                                        </div>
                                    </div>
                                    <div className="message-text">{msg.content}</div>
                                </div>
                            </div>
                        ))
                    )}

                    <div ref={messagesEndRef} />
                </div>

                <Form className="message-input-form" onSubmit={handleFormSubmit}>
                    <Form.Group className="d-flex">
                        <Form.Control
                            as="textarea"
                            className="message-textbox auto-resize-textarea"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onInput={(e) => {
                                e.target.style.height = 'inherit';
                                e.target.style.height = `${e.target.scrollHeight}px`;
                            }}
                            maxLength={200}
                        />
                        <Button variant="primary" type="submit" onClick={handleSendMessage} className="message-button">
                            <span className="message-button-text">Send</span>
                        </Button>
                    </Form.Group>
                </Form>
            </Col>


            <Col lg={3} md={3} sm={12} className="left-board-info p-5">
                <div className="rounded-box">
                    <h3 className="board-title ">Channel Members</h3>
                    {boardMembers.reverse().map(member => (
                        <p key={member.id} className="user-list ">
                            <span className="list-username">{member.username} </span><br /> 
                            <span className="list-email">({member.email})</span>
                        </p>
                    ))}
                </div>
                <BoardManagement 
                    boardId={boardId} 
                    isOwner={isOwner} 
                    boardMembers={boardMembers}
                    updateMembers={updateMembers}
                />
            </Col>
        </Row>
    </Container>
</div>
    );
};

export default DiscussionBoard;