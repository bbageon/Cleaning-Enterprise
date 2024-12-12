import { getTimeFormat } from '../../../../../../api/API';
import { ImageIcon, SendIcon } from '../../../../../../assets/icons';
import { CChatMessage, CChatRoomInfo } from '../../../Schedule/Class/schedule-class';
import './ChatSidebar.css';

interface ChatSidebarProps {
    roomInfos: Array<CChatRoomInfo>;
    selectChatRoom: (room_id: number) => void;
    selectChatIndex: number,
    setSelectChatIndex: (index: number) => void,
}

const chatStatus: Record<string, string> = {
    'DONE': '청소 완료',
    'CLEANING': '청소 중',
    'ERROR': '오류',
    'NEW': '신규 요창',
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
    roomInfos,
    selectChatRoom,

    selectChatIndex,
    setSelectChatIndex,
}) => {
    const regex = /^<!.*!>$/;

    return (
        <div className="chat-room-sidebar sidebar">
            <div className="rooftop">
                Message
            </div>
            <div className="content">
                {
                    roomInfos?.map((roomInfo, idx) => {
                        const { room_id, chat_room_name, last_chat_message, updated_at, status, not_read_count } = roomInfo;
                        return (
                            <div
                                className={`chat-room-info ${selectChatIndex === idx ? 'selected' : ''}`}
                                onClick={() => {
                                    setSelectChatIndex(idx);
                                    selectChatRoom(room_id);
                                }}
                            >
                                <div className="info">
                                    <span className="name">{chat_room_name}</span>
                                    <span className="time">
                                        {
                                            new Date(updated_at * 1000).toLocaleTimeString('ko-KR', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })
                                        }
                                    </span>
                                </div>
                                <div className="info">
                                    <span className="sub-name">
                                        {
                                            regex.test(last_chat_message) ?
                                                `사진을 보냈습니다` :
                                                last_chat_message
                                        }
                                    </span>
                                    <span className="not-read-count">{not_read_count}</span>
                                </div>
                                <div className="info">
                                    <div className={`status-circle ${status}`}></div>
                                    <span className={`status ${status}`}>{chatStatus[status]}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ChatSidebar;