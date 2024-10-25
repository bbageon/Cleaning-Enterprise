import { Route, Routes } from "react-router-dom"
import { ScrollToTop } from "../components"

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
                    element={<ChatRoom />}
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