import './ChatBallon.css';

const ChatBallon = ({
    chatMessages
}) => {
    return (
        chatMessages?.map(msg => {
            const { message, sender } = msg;
            return (
                <div className={`chat-message ${sender}`}>
                    {message}
                </div>
            )
        })
    )
}

export default ChatBallon;