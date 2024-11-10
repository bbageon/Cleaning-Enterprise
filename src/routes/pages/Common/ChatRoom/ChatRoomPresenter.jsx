import { MainLayout } from '../../../../components';

import './ChatRoom.css';
import { ChatBody } from './components/ChatBody';
import { ChatSidebar } from './components/ChatSidebar';

const ChatRoomPresenter = ({
    inputChatRef,
    chatMessage,
    setChatMessage,

    sendMessage,

    selectChatIndex,
    setSelectChatIndex,

    chatRoomList,

    clientId,
    chatRef,
    chatList,
    selectChatRoom,
}) => {
    // const roomInfos = [
    //     {
    //         chat_room_name: '김재모의 카피바라 청소',
    //         sub_name: '무엇을 도와드릴까요?',
    //         updated_at: 1730027342,
    //         status: 'DONE',
    //         not_read_count: 12,
    //     },
    //     {
    //         chat_room_name: '김재모의 카피바라 청소',
    //         sub_name: '무엇을 도와드릴까요?',
    //         updated_at: 17283845,
    //         status: 'CLEANING',
    //         not_read_count: 12,
    //     },
    //     {
    //         chat_room_name: '김재모의 카피바라 청소',
    //         sub_name: '무엇을 도와드릴까요?',
    //         updated_at: 17200025,
    //         status: 'ERROR',
    //         not_read_count: 12,
    //     },
    //     {
    //         chat_room_name: '김재모의 카피바라 청소',
    //         sub_name: '무엇을 도와드릴까요?',
    //         updated_at: 172838945,
    //         status: 'NEW',
    //         not_read_count: 12,
    //     },
    // ]

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

                clientId={clientId}
                chatRef={chatRef}
                chatList={chatList}
            />
        </MainLayout>
    )
}

export default ChatRoomPresenter;