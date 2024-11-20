import AdminHeader from '../AdminHeader';
import AdminSidebar from '../AdminSidebar';
import Content from '../Content';
import './AdminLayout.style.css';

const AdminLayout = ({
    children,
}) => {
    return (
        <div className='admin-layout-container'>
            <AdminSidebar
            
            />
            <AdminHeader
            
            />
            <Content

            >
                {children}
            </Content>
        </div>
    );
};

export default AdminLayout;