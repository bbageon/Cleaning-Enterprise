import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AdminLayout, ScrollToTop } from "../components";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

/**
 * 페이지
 * --
 */
import {
    // COMMON
    Main,
    ChatRoom,
    Review,
    Schedule,
    Employee,
    Company,
    Estimate,
    RequestClean,
    Login,

    // ADMIN
    AdminMain,
} from "./pages";
import AdminRoutes from './pages/Admin';
import { cookie, getCookie, isLogin } from "../util";

const Router = () => {
    const socketRef = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const setCookies = (data) => {
        try {
            if (!data) {
                throw new Error(`no has save cookie data`);
            }

            cookie.setCookie('id', data?.company_id, {
                path: '/',
            });

            cookie.setCookie('token', data?.token, {
                path: '/',
            });

            // cookie.setCookie('name', data?.name, {
            //     path: '/',
            // });

            // cookie.setCookie('email', data?.email, {
            //     path: '/',
            // });

            // cookie.setCookie('userType', data?.type, {
            //     path: '/',
            // });
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


    // useEffect(() => {
    //     socketRef.current = io(`${process.env.REACT_APP_CHAT_SERVER}/cleaning_chat`, {
    //         transports: ['websocket'],
    //         reconnectionAttempts: 3,
    //     });

    //     const socket = socketRef.current;

    //     socket.on('connect', () => {
    //         console.log('Connected to WebSocket server');
    //     });

    //     socket.on('disconnect', () => {
    //         console.log('Disconnected from WebSocket server');
    //     });

    //     return () => {
    //         socket.disconnect();
    //     }
    // }, []);

    // 라우터 변경 감지 (로그인 확인용)
    useEffect(() => {
        const { pathname } = location;
        if (pathname === '/' || pathname.startsWith('/admin')) return;

        // 만약 로그인 되어있지 않다면 메인 화면으로 이동
        if (!isLogin()) {
            alert(`로그인이 필요합니다`);
            document.getElementById('root').style.visibility = 'hidden';
            navigate('/')
            document.getElementById('root').style.visibility = 'visible';
            return;
        }
    }, [location]);

    return (
        <div className="app">
            <ScrollToTop />
            <Routes>
                {/* ===== COMMON ===== */}
                {/* 메인 화면 */}
                <Route
                    path="/"
                    element={<Login
                        setCookies={setCookies}
                    />}
                />
                <Route
                    path='/main'
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

                {/* ===== ADMIN ===== */}
                <Route
                    path='/admin/main'
                    element={<AdminMain />}
                />
            </Routes>

            <Routes>
                <Route index path='/admin/*' element={<AdminRoutes />} />
            </Routes>
        </div>
    );
};

export default Router;