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

    isShowSidebar: boolean;
    CustomSidebar: React.ReactNode;
    tabList: CSidebarTab;

    isShowHeader: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    page = '',
    title = '',
    className = '',
    articleStyle = {},

    isShowSidebar = true,
    CustomSidebar,
    tabList = new CSidebarTab(),

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
                className={isShowHeader ? '' : 'no-header'}
                style={articleStyle}
            >
                <div className="article-wrap">
                    {children}
                </div>
            </article>
            {isShowSidebar && (
                CustomSidebar ?
                    (
                        CustomSidebar
                    ) :
                    <MainSidebar
                        tabList={tabList}
                        className={isShowHeader ? '' : 'no-header'}
                    />
            )}
        </div>
    )
}

export default MainLayout;