import { Route, Routes } from "react-router-dom";
import { ScrollToTop } from "../components";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

/**
 * 페이지
 * --
 */
import {
    Main,
    ChatRoom,
    Review,
    Schedule,
    Employee,
    Company,
    Estimate,
    RequestClean,
} from "./pages";

const Router = () => {
    const socketRef = useState(null);

    useEffect(() => {
        socketRef.current = io('ws://localhost:4200/cleaning_chat', {
            transports: ['websocket'],
            reconnectionAttempts: 3,
        });

        const socket = socketRef.current;

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        return () => {
            socket.disconnect();
        }
    }, []);

    return (
        <div className="app">
            <ScrollToTop />
            <Routes>
                {/* 메인 화면 */}
                <Route
                    path='/'
                    element={<Main />}
                />
                {/* 대화방 관리 */}
                <Route
                    path='/chatroom'
                    element={<ChatRoom socketRef={socketRef} />}
                />
                {/* 리뷰 관리 및 청소 내역 */}
                <Route
                    path='/review'
                    element={<Review />}
                />
                {/* 일정 관리 */}
                <Route
                    path='/schedule'
                    element={<Schedule />}
                />
                {/* 직원 관리 */}
                <Route
                    path='/employee'
                    element={<Employee />}
                />
                {/* 업체 정보 관리 */}
                <Route
                    path='/company'
                    element={<Company />}
                />
                {/* 견적서 요청 관리 */}
                <Route
                    path='/estimate'
                    element={<Estimate />}
                />
                {/* 청소 요청 목록 */}
                <Route
                    path='/request_clean'
                    element={<RequestClean />}
                />
            </Routes>
        </div>
    )
}

export default Router;