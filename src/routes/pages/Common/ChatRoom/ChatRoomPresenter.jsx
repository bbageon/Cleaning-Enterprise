import { MainLayout } from '../../../../components';

import './ChatRoom.css';
import { ChatBody } from './components/ChatBody';

const ChatRoomPresenter = ({
    chatMessage,
    setChatMessage,

    sendMessage,
}) => {
    return (
        <MainLayout
            page='대화방 관리'
            title='대화방'
            className='translucent'
        >
            <ChatBody
                chatMessage={chatMessage}
                setChatMessage={setChatMessage}

                sendMessage={sendMessage}
            />
        </MainLayout>
    )
}

export default ChatRoomPresenter;