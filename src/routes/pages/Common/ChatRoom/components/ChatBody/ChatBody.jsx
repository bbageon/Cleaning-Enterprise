import ChatBallon from "../ChatBallon/ChatBallon";
import { ChatFooter } from "../ChatFooter";
import './ChatBody.css';

const ChatBody = ({
    inputChatRef,
    chatMessage,
    setChatMessage,

    sendMessage,

    clientId,
    chatRef,
    chatList,
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
            <div
                className="chat-messages"
                ref={chatRef}
            >
                <ChatBallon
                    clientId={clientId}
                    chatMessages={chatList}
                />
            </div>

            <ChatFooter
                inputChatRef={inputChatRef}
                chatMessage={chatMessage}
                setChatMessage={setChatMessage}

                sendMessage={sendMessage}
            />
        </div>
    )
}

export default ChatBody;