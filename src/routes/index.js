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
import { cookie } from "../util";

const Router = () => {
    const socketRef = useState(null);

    const setCookies = (data) => {
        try {
            if (!data) {
                throw new Error(`no has save cookie data`);
            }

            cookie.setCookie('id', data?.user_id, {
                path: '/',
            });

            cookie.setCookie('token', data?.token, {
                path: '/',
            });

            cookie.setCookie('name', data?.name, {
                path: '/',
            });

            cookie.setCookie('email', data?.email, {
                path: '/',
            });

            cookie.setCookie('userType', data?.type, {
                path: '/',
            });
        } catch (e) {
            console.error(e.message);
        }
    }

    const logOut = () => {
        cookie.remove('token', { path: '/' }, 1000);
        cookie.remove('name', { path: '/' }, 1000);
        cookie.remove('email', { path: '/' }, 1000);
        cookie.remove('userType', { path: '/' }, 1000);
    }


    useEffect(() => {
        socketRef.current = io(`${process.env.REACT_APP_CHAT_SERVER}/cleaning_chat`, {
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