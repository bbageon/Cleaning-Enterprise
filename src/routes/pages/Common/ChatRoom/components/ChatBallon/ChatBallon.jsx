import ChatImage from '../ChatImage';
import './ChatBallon.css';

const ChatBallon = ({
    clientId,
    chatMessages,
}) => {
    return (
        chatMessages?.map(msg => {
            const { message, sender } = msg;
            const regex = /^<!.*!>$/;

            return (
                <div className={`chat-message ${clientId === sender ? 'my' : 'other'}`}>
                    {
                        regex.test(message) ?
                            <ChatImage
                                imageMessage={message}
                            />
                            :
                            message
                    }
                </div>
            )
        })
    )
}

export default ChatBallon;