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
    const { state } = useLocation();
    const { room_id } = useParams();

    // Chat State
    const [sender, setSender] = useState('홍길동');
    const [receiver, setReceiver] = useState('테스트');
    const [clientId, setClientId] = useState('홍길동');
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

    useEffect(() => {
        try {
            (
                async () => {
                    try {
                        const userName = cookie.getCookie('name');
                        if (!userName) setClientId('홍길동');
                        else setClientId(userName);

                        const chatInfo = await API.getOneChatRoom(room_id);
                        if (chatInfo.status !== 200) throw new Error(`[ChatRoomContainer][getOneChatRoom] Error`);

                        console.log(chatInfo);
                        setSender(chatInfo.data.company.name);
                        setReceiver(chatInfo.data.user.name);

                        const chatMessageInfo = await API.getOneChatMessage(room_id);
                        if (chatMessageInfo.status !== 200) throw new Error(`[ChatRoomContainer][getOneChatMessage] Error`);
                        setChatList(chatMessageInfo.data.room_messages);
                        console.log(chatMessageInfo.data)
                    } catch (e) {
                        console.log(e.message);
                    }
                }
            )()
            console.log(state);

            if (!socketRef.current) {
                socketRef.current = io('ws://localhost:4200/cleaning_chat', {
                    transports: ['websocket'],
                    reconnectionAttempts: 3,
                });
            }

            socketRef.current?.on('chatMessage', (messageInfo) => {
                console.log(messageInfo);
                console.log(messageInfo.message);
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
            });
        } catch (e) {
            console.log(e)
        }
    }, []);

    const sendMessage = () => {
        if (!chatMessage.length) return;

        alert(chatMessage);
        setChatMessage('');
    }

    return (
        <ChatRoomPresenter
            chatMessage={chatMessage}
            setChatMessage={setChatMessage}

            sendMessage={sendMessage}

            selectChatIndex={selectChatIndex}
            setSelectChatIndex={setSelectChatIndex}
        />
    )
}

export default ChatRoomContainer;