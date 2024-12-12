import './AdminLayout.style.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminHeader from '../AdminHeader';
import { useBreadcrumbStack } from '../../../store';
import { Button, Layout, Menu } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';

/* ===== ANT DESIGN ===== */
const {
    Header,
    Footer,
    Sider,
    Content
} = Layout;

const AdminLayout = (props) => {

    /* ===== ROUTE ===== */
    const location = useLocation();
    const { pathname } = location;

    /* ===== PROPS ===== */
    const {
        menu,
        children,
        headerExceptPath,
        footerExceptPath,
        siderExceptPath,
        selectedKeys,
        onSelect,
        brand = ''
    } = props;

    /* ===== STATE ===== */
    const breadcrumb = useBreadcrumbStack();
    // Header
    const [isHeader, setIsHeader] = useState(true);

    // Footer
    const [isFooter, setIsFooter] = useState(true);

    // Sider
    const [isSider, setIsSider] = useState(true);
    // Sider Collapse
    const [isCollapsed, setIsCollapsed] = useState(false);
    // Sider Open
    const [isOpened, setIsOpened] = useState(true);
    const [openKeys, setOpenKeys] = useState([]);

    /* ===== FUNCTION ===== */
    const handleOpenMenu = (key) => {
        setOpenKeys(key);
    };

    const handleOpenToggleMenu = (t) => {
        const type = t.toLocaleUpperCase();

        switch (type) {
            case 'OPEN':
                const keys = menu.reduce((acc, cur) => {
                    acc.push(cur.key);

                    return acc;
                }, []);
                setOpenKeys(keys);
                setIsOpened(true);
                break;
            case 'CLOSE':
                setOpenKeys([]);
                setIsOpened(false);
                break;
            default:
                break;
        }
    };

    /* ===== EFFECT ===== */
    // useEffect(() => {
    //     const call = (path) => {
    //         const splitPath = path.split('/')[1] ?? '';

    //         if (headerExceptPath.includes(splitPath)) {
    //             setIsHeader(false);
    //         } else {
    //             setIsHeader(true);
    //         }

    //         if (siderExceptPath.includes(splitPath)) {
    //             setIsSider(false);
    //         } else {
    //             setIsSider(true);
    //         }
    //     };

    //     pathname && call(pathname);
    // }, [pathname, headerExceptPath, footerExceptPath, siderExceptPath]);

    /* ===== STYLES ===== */
    const styles = {
        layout: {
            height: '100vh',
            position: 'relative',
            top: 0,
            left: 0,
        },
        header: {
            position: 'fixed',
            top: 0,
            left: isSider ? (isCollapsed ? 80 : 250) : 0,
            width: `calc(100% - ${isSider ? (isCollapsed ? '80px' : '250px' ) : '0px' })`,
            zIndex: 1000,
            height: 68,
            background: '#FFFFFF',
            padding: '0px 20px',
        },
        sider: {
            overflow: 'hidden',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
        },
        siderHeader: {
            padding: '15px 20px',
            background: '#707070',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        container: {
            position: 'absolute',
            top: isHeader ? 68 : 0,
            left: isSider ? (isCollapsed ? 80 : 250) : 0,
            width: isSider
                ? `calc(100vw - ${isCollapsed ? '80px' : '250px'})`
                : '100vw',
            background: '#F8F8F8',
        },
        content: {
            height: `calc(100vh - ${isHeader ? '68px' : '0px'})`,
            overflow: 'auto',
            position: 'relative',
            top: 0,
            left: 0,
        },
        footer: {
            height: 150,
        },
        siderHeader: {
            padding: '15px 20px',
            background: '#707070',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
    };

    /* ===== RENDER ===== */
    return (
        <Layout style={styles.layout}>
            {/* 사이드 메뉴 */}
            {isSider && (
                <>
                    <Sider
                        style={styles.sider}
                        trigger={null}
                        collapsible
                        collapsed={isCollapsed}
                        width={250}
                    >
                        <div className="logo" style={{ ...styles.siderHeader }}>
                            {!isCollapsed && (
                                <h4
                                    style={{
                                        fontSize: 28,
                                        fontWeight: 700,
                                        color: '#FFFFFF',
                                    }}
                                >
                                    CLEAN KONG
                                </h4>
                            )}
                            <Button
                                icon={
                                    isCollapsed ? (
                                        <DoubleRightOutlined />
                                    ) : (
                                        <DoubleLeftOutlined />
                                    )
                                }
                                type="link"
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                style={{ color: '#FFFFFF' }}
                            />
                        </div>
                        <Menu
                            items={menu}
                            mode="inline"
                            selectedKeys={selectedKeys}
                            style={{
                                height: 'calc(100% - 64px)',
                                overflow: 'auto',
                                background: '#707070',
                            }}
                            onSelect={({ key }) => onSelect(key)}
                            openKeys={openKeys}
                            onOpenChange={(key) => handleOpenMenu(key)}
                        />
                    </Sider>
                </>
            )}
            {/* 사이드 메뉴 끝 */}

            {/* 사이드 메뉴 / 본문 / 푸터 */}
            <Layout style={{ background: 'none' }}>
                {/* 해더 */}
                {
                    isHeader && (
                        <AdminHeader
                            maxWidth={'100%'}
                            style={styles.header}
                            name={'CLEAN KONG'}
                            leftContent={breadcrumb}
                            rightContent={[
                                {
                                    title: isOpened ? '전체메뉴 닫기' : '전체메뉴 열기',
                                    onClick: () =>
                                        handleOpenToggleMenu(isOpened ? 'close' : 'open')
                                },
                                { title: '공지사항' },
                                { title: '메뉴얼' },
                                { title: <span style={{ fontWeight: 600 }}>{brand}</span> },
                            ]}
                        />
                    )
                }
                {/* 해더 끝 */}

                {/* 본문 / 푸터 */}
                <Layout style={styles.container}>
                    {/* 본문 */}
                    <Content
                        maxWidth={'100%'}
                        backgroundColor={'#F2F7F8'}
                        padding={0}
                        style={styles.content}
                    >
                        {children}
                    </Content>
                    {/* 본문 끝 */}
                </Layout>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
