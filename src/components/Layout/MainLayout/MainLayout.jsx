import MainHeader from "../MainHeader";
import MainNav from "../MainNav";

import './MainLayout.css';

const MainLayout = ({
    children,
}) => {
    return (
        <div className="layout">
            <MainHeader />
            <MainNav />
            {children}
        </div>
    )
}

export default MainLayout;