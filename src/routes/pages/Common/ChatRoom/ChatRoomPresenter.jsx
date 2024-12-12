import { MainLayout } from '../../../../components';

import './ChatRoom.css';
import { ChatBody } from './components/ChatBody';
import { ChatSidebar } from './components/ChatSidebar';

const ChatRoomPresenter = ({
    inputChatRef,
    chatMessage,
    setChatMessage,

    sendMessage,

    sendSelectPicture,
    selectMultiPictures,
    clearSelectPicture,

    selectedPictures,

    selectChatIndex,
    setSelectChatIndex,

    chatRoomList,

    clientId,
    chatRef,
    chatList,
    selectChatRoom,
}) => {
    return (
        <MainLayout
            page='대화방 관리'
            title='대화방'
            className='translucent'
            CustomSidebar={
                <ChatSidebar
                    roomInfos={chatRoomList}
                    selectChatRoom={selectChatRoom}

                    selectChatIndex={selectChatIndex}
                    setSelectChatIndex={setSelectChatIndex}
                />
            }
            isShowHeader={false}
        >
            <ChatBody
                inputChatRef={inputChatRef}
                chatMessage={chatMessage}
                setChatMessage={setChatMessage}

                sendMessage={sendMessage}

                sendSelectPicture={sendSelectPicture}
                selectMultiPictures={selectMultiPictures}
                clearSelectPicture={clearSelectPicture}

                selectedPictures={selectedPictures}

                clientId={clientId}
                chatRef={chatRef}
                chatList={chatList}
            />
        </MainLayout>
    )
}

export default ChatRoomPresenter;