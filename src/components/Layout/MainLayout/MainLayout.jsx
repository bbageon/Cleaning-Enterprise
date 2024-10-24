import MainHeader from "../MainHeader";
import MainNav from "../MainNav";

import './MainLayout.css';

const MainLayout = ({
    children,
}) => {
    return (
        <div className="layout">
            <MainNav />
            <MainHeader />
            <article>
                {children}
            </article>
        </div>
    )
}

export default MainLayout;