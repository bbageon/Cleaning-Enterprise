import ChatRoomPresenter from "./ChatRoomPresenter";
import { useRef, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { API } from "../../../../api";
import { io } from "socket.io-client";
import { cookie } from "../../../../util";

const ChatRoomContainer = ({
    socketRef,
}) => {
    const inputChatRef = useRef(null);
    const chatRef = useRef(null);

    // Chat State
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('테스트');
    const [clientId, setClientId] = useState('청년아이앤에스');
    const [chatMessage, setChatMessage] = useState('');
    const [chatTitle, setChatTitle] = useState('김재모의 카피바라 청소');
    const [chatList, setChatList] = useState([
        // {
        //     sender: '안김재모',
        //     receiver: '받는사람',
        //     message: `안녕하세요 김재모 입니다. 무엇을 도와드릴까요 ?`,
        // },
    ])
    const [selectChatIndex, setSelectChatIndex] = useState(0);
    const [chatRoomList, setChatRoomList] = useState([{}, {}]);
    const [currentRoomInfo, setCurrentRoomInfo] = useState({
        room_id: '',
        chat_room_id: -1
    });

    useEffect(() => {
        (
            async () => {
                try {
                    // const company_id = cookie.getCookie('id');
                    // const result = await API.getCompanyChatRoom(company_id);
                    const id = `${process.env.REACT_APP_TEST_COMPANY_ID}`
                    const company = await API.getOneCompany(id);
                    if (company.status !== 200) throw new Error(`[ChatRoomListContainer] [useEffect] Error`);

                    setClientId(company.data.company_name);
                    setSender(company.data.company_name);

                    const result = await API.getCompanyChatRoom(id);
                    if (result.status !== 200) throw new Error(`[ChatRoomListContainer] [useEffect] Error`);
                    setChatRoomList(result.data.chat_rooms);
                    setReceiver(result.data.user.name);

                    const chatMessageInfo = await API.getOneChatMessage(result.data.chat_rooms[0].room_id);
                    if (chatMessageInfo.status !== 200) throw new Error(`[ChatRoomContainer][getOneChatMessage] Error`);
                    setChatList(chatMessageInfo.data.room_messages);
                    setCurrentRoomInfo({
                        room_id: chatMessageInfo.data.room.room_id,
                        chat_room_id: chatMessageInfo.data.room.chat_room_id,
                    })
                } catch (e) {
                    console.log(e.message);
                }
                if (!socketRef.current) {
                    socketRef.current = io(`${process.env.REACT_APP_CHAT_SERVER}/cleaning_chat`, {
                        transports: ['websocket'],
                        reconnectionAttempts: 3,
                    });
                }

                socketRef.current?.on('chatMessage', (messageInfo) => {
                    setChatList(prev => {
                        return [
                            ...prev,
                            {
                                sender: messageInfo.sender,
                                receiver: messageInfo.receiver,
                                message: messageInfo.message,
                            }
                        ]
                    });

                    setChatRoomList((prevChatRoomList) =>
                        prevChatRoomList.map((room, idx) =>
                            idx === selectChatIndex
                                ? { ...room, last_chat_message: messageInfo.message }
                                : room
                        )
                    );
                });
            }
        )()
    }, []);

    useEffect(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [chatList]);

    const selectChatRoom = async (room_id) => {
        try {
            const chatInfo = await API.getOneChatRoom(room_id);
            if (chatInfo.status !== 200) throw new Error(`[ChatRoomContainer][getOneChatRoom] Error`);

            const { data } = chatInfo;

            // setSender('고길동');
            setSender(data.company.company_name);
            setReceiver(data.user.name);

            const chatMessageInfo = await API.getOneChatMessage(room_id);
            if (chatMessageInfo.status !== 200) throw new Error(`[ChatRoomContainer][getOneChatMessage] Error`);
            setChatList(chatMessageInfo.data.room_messages);
            setCurrentRoomInfo({
                room_id: chatMessageInfo.data.room.room_id,
                chat_room_id: chatMessageInfo.data.room.chat_room_id,
            })
        } catch (e) {
            console.log(e.message);
        }
    }

    const sendMessage = () => {
        if (!chatMessage.length) return;

        const { room_id, chat_room_id } = currentRoomInfo;

        if (chat_room_id === -1) return;

        socketRef.current.emit('chatMessage', {
            room_id,
            chat_room_id,
            message: chatMessage,
            sender,
            receiver,
        });
        inputChatRef.current.focus();
        // alert(chatMessage);
        setChatMessage('');
    }

    return (
        <ChatRoomPresenter
            inputChatRef={inputChatRef}
            chatMessage={chatMessage}
            setChatMessage={setChatMessage}

            sendMessage={sendMessage}

            selectChatIndex={selectChatIndex}
            setSelectChatIndex={setSelectChatIndex}

            chatRoomList={chatRoomList}

            clientId={clientId}
            chatRef={chatRef}
            chatList={chatList}
            selectChatRoom={selectChatRoom}
        />
    )
}

export default ChatRoomContainer;