import { ImageIcon, SendIcon } from '../../../../../../assets/icons';
import ImagePreview from '../ImagePreview';
import './ChatFooter.css';

const ChatFooter = ({
    inputChatRef,
    chatMessage,
    setChatMessage,

    sendMessage,

    selectMultiPictures,
}) => {
    return (
        <div className="chat-room-footer">
            {/* 입력창 */}
            <input
                ref={inputChatRef}
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
                autoFocus
            />

            {/* 채팅 전송 아이콘 */}
            <div className='icons'>
                <input
                    id='chat-image-upload'
                    type='file'
                    accept='image/*'
                    multiple
                    style={{ display: 'none' }}
                    onChange={e => selectMultiPictures(e)}
                />
                <ImageIcon
                    onClick={() => {
                        document.getElementById('chat-image-upload').click();
                    }}
                />
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