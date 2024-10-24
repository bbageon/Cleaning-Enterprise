import { Route, Routes } from "react-router-dom"
import { ScrollToTop } from "../components"

/**
 * 페이지
 * --
 */
import { Main } from "./pages";

const Router = () => {
    return (
        <div className="app">
            <ScrollToTop />
            <Routes>
                <Route
                    path='/'
                    element={<Main />}
                />
            </Routes>
        </div>
    )
}

export default Router;