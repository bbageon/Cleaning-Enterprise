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
    const [sender, setSender] = useState('발신자');                       // 발신자
    const [receiver, setReceiver] = useState('수신자');                   // 수신자
    const [clientId, setClientId] = useState('발신자 확인');               // 발신자 확인용
    const [chatMessage, setChatMessage] = useState('');                 // 입력한 채팅 메시지
    const [chatTitle, setChatTitle] = useState('채팅방 제목');             // 채팅방 제목
    const [chatList, setChatList] = useState([]);                       // 채팅 메시지 목록
    const [selectChatIndex, setSelectChatIndex] = useState(0);          // 현재 선택한 채팅방 인덱스
    const [chatRoomList, setChatRoomList] = useState([]);               // 채팅방 목록
    const [currentRoomInfo, setCurrentRoomInfo] = useState({            // 현재 채팅방 정보
        room_id: '',
        chat_room_id: -1
    });

    const [selectedPictures, setSelectedPictures] = useState([]);


    useEffect(() => {
        (
            async () => {
                try {
                    const id = `${process.env.REACT_APP_TEST_COMPANY_ID}`

                    const result = await API.getCompanyChatRoom(id);
                    if (result.status !== 200) throw new Error(`[ChatRoomListContainer] [useEffect] Error`);

                    // 발신자 설정
                    setClientId(result.data.company.company_name);
                    setSender(result.data.company.company_name);

                    // 수신자 설정
                    setReceiver(result.data.chat_rooms[0].user.name);

                    // 채팅방 설정
                    setChatRoomList(result.data.chat_rooms);

                    const chatMessageInfo = await API.getOneChatMessage(result.data.chat_rooms[0].room_id);
                    if (chatMessageInfo.status !== 200) throw new Error(`[ChatRoomContainer][getOneChatMessage] Error`);
                    setChatList(chatMessageInfo.data.room_messages);
                    setCurrentRoomInfo({
                        room_id: chatMessageInfo.data.room.room_id,
                        chat_room_id: chatMessageInfo.data.room.chat_room_id,
                    });
                } catch (e) {
                    console.log(e.message);
                }

                // 웹소켓 설정
                if (!socketRef.current) {
                    socketRef.current = io(`${process.env.REACT_APP_CHAT_SERVER}/cleaning_chat`, {
                        transports: ['websocket'],
                        reconnectionAttempts: 3, // 웹소켓이 연결되지 않을 경우 최대 3번까지 재연결 시도
                    });
                }
            }
        )()
    }, []);

    // 채팅방의 스크롤을 맨 밑으로 자동 이동
    useEffect(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [chatList]);

    // 채팅방 정보가 갱신
    useEffect(() => {// chatMesseage 메시지를 통해 메시지를 전달받은 경우 채팅 메시지 목록에 해당 내용 추가
        socketRef.current?.off('chatMessage');

        socketRef.current?.on('chatMessage', (messageInfo) => {
            // 자신이 보낸 메시지일 경우
            if (messageInfo.sender === sender) {
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

                // 채팅방의 마지막 메시지 띄우기
                setChatRoomList((prevChatRoomList) =>
                    prevChatRoomList.map((room, idx) =>
                        idx === selectChatIndex
                            ? { ...room, last_chat_message: messageInfo.message }
                            : room
                    )
                );

                return;
            }

            // 수신일 경우 다른 채팅방에서 수신한 메시지는 거른다
            if (messageInfo.chat_room_id !== currentRoomInfo.chat_room_id) return;
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

            // 채팅방의 마지막 메시지 띄우기
            setChatRoomList((prevChatRoomList) =>
                prevChatRoomList.map((room, idx) =>
                    idx === selectChatIndex
                        ? { ...room, last_chat_message: messageInfo.message }
                        : room
                )
            );
        });
    }, [currentRoomInfo])


    // 채팅방 선택
    const selectChatRoom = async (room_id) => {
        try {
            // 채팅방의 정보 가져오기
            const chatInfo = await API.getOneChatRoom(room_id);
            if (chatInfo.status !== 200) throw new Error(`[ChatRoomContainer][getOneChatRoom] Error`);

            const { data } = chatInfo;

            console.log(`발신자: ${data.company.company_name}`);
            console.log(`수신자: ${data.user.name}`);

            // 발신자 및 수신자 설정
            setSender(data.company.company_name);
            setReceiver(data.user.name);

            // 채팅 메시지 가져오기
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

    // 메시지 보내기
    const sendMessage = () => {
        // 입력창이 비어있는 경우 메시지를 전송할 수 없음
        if (!chatMessage.length) return;

        const { room_id, chat_room_id } = currentRoomInfo;

        if (chat_room_id === -1) return;

        // 메시지 전달 시 채팅 정보와 chatMessage 메시지를 같이 보냄
        socketRef.current.emit('chatMessage', {
            room_id,
            chat_room_id,
            message: chatMessage,
            sender,
            receiver,
        });

        // 메시지 전달 완료 후 입력 메시지를 비우고 입력 창으로 포커스를 맞춘다
        inputChatRef.current.focus();
        setChatMessage('');
    }

    // 이미지 선택(input)
    const MAX_IMAGE_SIZE = 5;
    const selectMultiPictures = async (e) => {
        try {
            const pictures = [];
            const files = Array.from(e.target.files);

            files.map((file, idx) => {
                if (idx >= MAX_IMAGE_SIZE) return;

                pictures.push(file);
            })

            setSelectedPictures(pictures);
        } catch (e) {
            console.error(e);
        }
    }

    // 이미지 전송
    const sendSelectPicture = async () => {
        const { room_id, chat_room_id } = currentRoomInfo;
        console.log(selectedPictures)

        const formData = new FormData();
        selectedPictures?.map(picture => {
            formData.append('files', picture);
        })

        try {
            const result = await API.postImagesTest(formData);

            console.log(result);
            if (result.status !== 200) {
                throw new Error(`invalid upload images`);
            }

            // 이미지가 전달된 경우 ,로 이미지를 구분한 후 이미지를 뜻하는 <! !> 를 앞 뒤로 붙여준다
            const imageUrl = "<!" + result.data.join(',') + "!>";

            socketRef.current.emit('chatMessage', {
                room_id,
                chat_room_id,
                message: imageUrl,
                sender,
                receiver,
            });
            setSelectedPictures([]);
        } catch (e) {
            console.error(e);
        }
    }

    // 선택한 이미지 초기화
    const clearSelectPicture = () => {
        setSelectedPictures([]);
    }


    return (
        <ChatRoomPresenter
            inputChatRef={inputChatRef}
            chatMessage={chatMessage}
            setChatMessage={setChatMessage}

            sendMessage={sendMessage}

            sendSelectPicture={sendSelectPicture}
            selectMultiPictures={selectMultiPictures}
            clearSelectPicture={clearSelectPicture}

            selectedPictures={selectedPictures}

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