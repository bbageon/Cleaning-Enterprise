import './ChatBallon.css';

const ChatBallon = ({
    clientId,
    chatMessages,
}) => {
    return (
        chatMessages?.map(msg => {
            const { message, sender } = msg;
            console.log(`${clientId}, ${sender}`)
            
            return (
                <div className={`chat-message ${clientId === sender ? 'my' : 'other'}`}>
                    {message}
                </div>
            )
        })
    )
}

export default ChatBallon;