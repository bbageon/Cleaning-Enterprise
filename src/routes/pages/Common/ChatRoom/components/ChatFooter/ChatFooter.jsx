import { ImageIcon, SendIcon } from '../../../../../../assets/icons';
import './ChatFooter.css';

const ChatFooter = ({
    chatMessage,
    setChatMessage,

    sendMessage,
}) => {
    return (
        <div className="chat-room-footer">
            <input
                type="text"
                className='chat-input'
                value={chatMessage}
                onChange={(e) => {
                    setChatMessage(e.target.value)
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        sendMessage()
                    }
                }}
            />
            <div className='icons'>
                <ImageIcon />
                <SendIcon
                    onClick={() => {
                        sendMessage()
                    }}
                />
            </div>
        </div>
    )
}

export default ChatFooter;