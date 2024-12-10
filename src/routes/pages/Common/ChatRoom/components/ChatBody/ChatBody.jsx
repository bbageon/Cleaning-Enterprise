import ChatBallon from "../ChatBallon/ChatBallon";
import { ChatFooter } from "../ChatFooter";
import ImagePreview from "../ImagePreview";
import './ChatBody.css';

const ChatBody = ({
    inputChatRef,
    chatMessage,
    setChatMessage,

    sendMessage,

    sendSelectPicture,
    selectMultiPictures,
    clearSelectPicture,

    selectedPictures,

    clientId,
    chatRef,
    chatList,
}) => {
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

            {/* 이미지 미리보기 */}
            {
                selectedPictures.length > 0 &&
                <ImagePreview
                    images={selectedPictures}

                    clearSelectPicture={clearSelectPicture}
                    sendSelectPicture={sendSelectPicture}
                />
            }

            <ChatFooter
                inputChatRef={inputChatRef}
                chatMessage={chatMessage}
                setChatMessage={setChatMessage}

                sendMessage={sendMessage}

                selectMultiPictures={selectMultiPictures}

                selectedPictures={selectedPictures}
            />
        </div>
    )
}

export default ChatBody;