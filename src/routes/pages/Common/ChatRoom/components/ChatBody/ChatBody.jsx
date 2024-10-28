import ChatBallon from "../ChatBallon/ChatBallon";
import { ChatFooter } from "../ChatFooter";
import './ChatBody.css';

const ChatBody = ({
    chatMessage,
    setChatMessage,

    sendMessage,
}) => {
    const chatMessages = [
        {
            message: '테스트',
            sender: 'other',
        },
        {
            message: '테스트2',
            sender: 'my',
        },
    ]

    return (
        <div className="chat-room-body">
            <div className="chat-messages">
                <ChatBallon
                    chatMessages={chatMessages}
                />
            </div>

            <ChatFooter
                chatMessage={chatMessage}
                setChatMessage={setChatMessage}

                sendMessage={sendMessage}
            />
        </div>
    )
}

export default ChatBody;