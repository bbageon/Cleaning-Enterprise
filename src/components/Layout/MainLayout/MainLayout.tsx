import { CSidebarTab } from "../Class/layout-class";
import MainHeader from "../MainHeader";
import MainNav from "../MainNav";
import MainSidebar from "../MainSidebar";

import './MainLayout.css';

interface MainLayoutProps {
    children: React.ReactNode;
    page: string;
    title: string;
    isShowSidebar: boolean;
    tabList: CSidebarTab;
    className: string;
    CustomSidebar: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    page = '',
    title = '',
    isShowSidebar = true,
    tabList = new CSidebarTab(),
    className = '',
    CustomSidebar,
}) => {
    return (
        <div className={`layout ${className}`}>
            <MainNav
                page={page}
            />
            <MainHeader
                title={title.length ? title : page}
                className='translucent'
            />
            <article>
                {children}
            </article>
            {isShowSidebar && (
                CustomSidebar ?
                    (
                        CustomSidebar
                    ) :
                    <MainSidebar tabList={tabList} />
            )}
        </div>
    )
}

export default MainLayout;