import { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

const ChatRoom = () => {
    const [message, setMessage] = useState(``);
    const [messageHistory, setMessageHistory] = useState([]);
    const socketUrl = `ws://localhost:3030`;

    const {
        sendMessage,
        sendJsonMessage,
        lastMessage,
        lastJsonMessage,
        readyState,
        getWebSocket,
    } = useWebSocket(socketUrl, {
        onOpen: () => console.log(`Connected to WebSocket Server.`),
        shouldReconnect: (closeEvent) => true
    })

    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev) => prev.concat(lastMessage));
        }
    }, [lastMessage, setMessageHistory])

    const handleSend = (e) => {
        e.preventDefault();

        sendMessage(message, true);

        setMessage(``);
    }

    return (
        <div className="chat-room">
            <div id="message-container">{messageHistory.map((msg, key) => (
                <p key={key}>{msg && msg.data}</p>
            ))}</div>
            <form id="message-form" onSubmit={handleSend}>
                <input
                    type="text"
                    id="message-input"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <button type="submit" id="send-btn">Send</button>
            </form>
        </div>
    )
}

export default ChatRoom;