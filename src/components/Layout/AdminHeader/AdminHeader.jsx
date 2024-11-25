import { Breadcrumb } from 'antd';
import './AdminHeader.style.css';

const buttonStyle = {
    width: '100%',
    textAlign: 'left',
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
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;