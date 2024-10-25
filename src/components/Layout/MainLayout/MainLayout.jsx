import MainHeader from "../MainHeader";
import MainNav from "../MainNav";

import './MainLayout.css';

const MainLayout = ({
    children,
    page,
}) => {
    return (
        <div className="layout">
            <MainNav
                page={page}
            />
            <MainHeader />
            <article>
                {children}
            </article>
        </div>
    )
}

export default MainLayout;