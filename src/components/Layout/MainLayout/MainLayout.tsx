import { CSidebarTab } from "../Class/layout-class";
import MainHeader from "../MainHeader";
import MainNav from "../MainNav";
import MainSidebar from "../MainSidebar";

import './MainLayout.css';

interface MainLayoutProps {
    children: React.ReactNode;
    page: string;
    title: string;
    tabList: CSidebarTab;
    className: string;

    // 사이드바
    isShowSidebar: boolean;
    isRight: boolean;
    isFull: boolean;

    // 헤더
    isShowHeader: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    page = '',
    title = '',
    tabList = new CSidebarTab(),
    className = '',

    // 사이드바
    isShowSidebar = true,
    isRight,
    isFull,

    // 헤더
    isShowHeader = true,
}) => {
    return (
        <div className={`layout ${className}`}>
            <MainNav
                page={page}
            />
            {
                isShowHeader &&
                <MainHeader
                    title={title.length ? title : page}
                    className='translucent'
                />
            }
            <article
                style={{
                    height: isFull ? '100%' : ''
                }}
            >
                {children}
            </article>
            {
                isShowSidebar &&
                <MainSidebar
                    isFull={isFull}
                    tabList={tabList}
                    isRight={isRight}
                />
            }
        </div>
    )
}

export default MainLayout;