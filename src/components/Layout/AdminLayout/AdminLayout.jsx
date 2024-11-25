import { Button, Layout, Menu } from 'antd';
import './AdminLayout.style.css';
import { useState } from 'react';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';

/* ===== ANT DESIGN ===== */
const { Header, Footer, Sider, Content } = Layout;

const AdminLayout = (props) => {
    /* ===== PROPS ===== */
    const { menu, children, selectedKeys, onSelect, brand = '' } = props;

    /* ===== STATE ===== */
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

    /* ===== STYLES ===== */
    const styles = {
        layout: {
            height: '100vh',
            position: 'relative',
            top: 0,
            left: 0,
        },
        sider: {
            background: '#707070',
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
            {/* ===== SIDER ===== */}
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
            {/* ===== ===== ===== */}
            <Layout style={{ background: 'none' }}>
                {/* ===== HEADER ===== */}
                {
                    // isHeader && (
                    // )
                }
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
