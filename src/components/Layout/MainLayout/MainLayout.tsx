import { CSidebarTab } from "../Class/layout-class";
import MainHeader from "../MainHeader";
import MainNav from "../MainNav";
import MainSidebar from "../MainSidebar";

import './MainLayout.css';

interface MainLayoutProps {
    children: React.ReactNode;
    page: string;
    isShowSidebar: boolean;
    tabList: CSidebarTab;
}

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    page = '',
    isShowSidebar = true,
    tabList = new CSidebarTab(),
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
            {
                isShowSidebar &&
                <MainSidebar
                    tabList={tabList}
                />
            }
        </div>
    )
}

export default MainLayout;