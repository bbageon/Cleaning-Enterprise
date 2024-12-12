import './AdminHeader.style.css';
import { Avatar, Badge, Button, Popover } from 'antd';
import { Breadcrumb } from '../../Text';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

const buttonStyle = {
    width: '100%',
    textAlign: 'left',
};

const PopoverContent = ({ onLogout }) => {
    return (
        <>
            <ul>
                <li>
                    <Button
                        type="text"
                        danger
                        icon={<LogoutOutlined />}
                        style={{ ...buttonStyle }}
                        onClick={() => onLogout()}
                    >
                        로그아웃
                    </Button>
                </li>
            </ul>
        </>
    );
};

const AdminHeader = ({
    maxWidth,
    style,
    leftContent = [],
    rightContent = [],
    profile,
    count,
    size = 32,
    avatarStyle,
    onLogout,
}) => {

    /* ===== RENDER ===== */
    return (
        <div className='admin-header-layout' style={{ ...style }}>
            <div className='admin-header-container' style={{ maxWidth: maxWidth }}>
                <div className='admin-breadcrumb'>
                    <Breadcrumb
                        items={leftContent}
                        separator={'>'}
                    />
                </div>
                <div className='admin-info'>
                    <div style={{ marginLeft: 16 }}>
                        <Breadcrumb
                            items={rightContent}
                            style={{ fontSize: 16 }}
                        />
                    </div>
                    <Popover
                        content={<PopoverContent onLogout={onLogout} />}
                        trigger={'click'}
                        placement='bottom'
                    >
                        <Badge count={count}>
                            <Avatar
                                size={size}
                                icon={<UserOutlined />}
                                src={profile}
                                style={{ background: '#EEEEEE', ...avatarStyle }}
                            />
                        </Badge>
                    </Popover>
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;