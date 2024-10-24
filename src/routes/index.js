import { Route, Routes } from "react-router-dom"
import { ScrollToTop } from "../components"

/**
 * 페이지
 * --
 */
import {
    Main,
    Schedule,
} from "./pages";

const Router = () => {
    return (
        <div className="app">
            <ScrollToTop />
            <Routes>
                <Route
                    path='/'
                    element={<Main />}
                />
                <Route
                    path='/schedule'
                    element={<Schedule />}
                />
            </Routes>
        </div>
    )
}

export default Router;