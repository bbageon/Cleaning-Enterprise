import { CSidebarTab } from "../Class/layout-class";
import MainHeader from "../MainHeader";
import MainNav from "../MainNav";
import MainSidebar from "../MainSidebar";

import './MainLayout.css';

interface MainLayoutProps {
    children: React.ReactNode;
    page: string;
    title: string;
    className: string;
    articleStyle: object;
    articleWrapStyle: object;

    CustomSidebar: React.ReactNode;
    tabList: CSidebarTab;

    // 사이드바
    isShowSidebar: boolean;

    isShowHeader: boolean;
    isFull: boolean;
    isRight: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    page = '',
    title = '',
    className = '',
    articleStyle = {},
    articleWrapStyle = {},

    CustomSidebar,
    tabList = new CSidebarTab(),
    isShowHeader = true,
    isShowSidebar = true,
    isFull,
    isRight,

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
                className={isShowHeader ? '' : 'no-header'}
                style={articleStyle}
            >
                <div
                    className="article-wrap"
                    style={articleWrapStyle}
                >
                    {children}
                </div>
            </article>
            {isShowSidebar && (
                CustomSidebar ?
                    (
                        CustomSidebar
                    ) :
                    <MainSidebar
                        isRight={isRight}
                        isFull={isFull}
                        tabList={tabList}
                        className={isShowHeader ? '' : 'no-header'}
                    />
            )}
        </div>
    )
}

export default MainLayout;