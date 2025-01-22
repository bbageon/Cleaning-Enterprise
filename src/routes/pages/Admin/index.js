import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../../components';

// Icons
import {
    ProductOutlined,
    SolutionOutlined,
    StarOutlined,
    UserOutlined,
} from '@ant-design/icons';

// 회원(User) Route
import {
    UserDashboard,
    UserList
} from './User';

// 청소업체(Company) Route
import {
    CompanyDashboard,
    CompanyList
} from './Company';

// 서비스(Service) Route
import {
    ServiceDashboard,
    ServiceList
} from './Service';

// 리뷰(Review) Route
import {
    ReviewDashboard,
    ReviewList,
} from './Review';

// 관리자 라우트
const AdminRoutes = () => {
    /* ===== STATE ===== */
    const [selectedKeys, setSelectedKeys] = useState(['users']);

    /* ===== ROUTE ===== */
    const navigate = useNavigate();

    /* ===== MENU ===== */ // 사이드바
    const menu = [

        // 회원 관리
        {
            key: 'user-management',
            icon: <UserOutlined />,
            label: '회원 관리',
            children: [
                {
                    key: 'users-dashboard',
                    label: '대시보드',
                    icon: null,
                    onClick: () => navigate('users/dashboard'),
                },
                {
                    key: 'users-list',
                    label: '회원 목록',
                    icon: null,
                    onClick: () => navigate('users/list'),
                },
                // {
                //     key: 'users-register',
                //     label: '회원 등록/수정',
                //     icon: null,
                //     onClick: () => navigate('users/register'),
                // },
            ],
        },

        // 청소업체 관리
        {
            key: 'company-management',
            icon: <SolutionOutlined />,
            label: '청소업체 관리',
            children: [
                {
                    key: 'companies-dashboard',
                    label: '대시보드',
                    icon: null,
                    onClick: () => navigate('companies/dashboard'),
                },
                {
                    key: 'companies-list',
                    label: '청소업체 목록',
                    icon: null,
                    onClick: () => navigate('companies/list'),
                },
                // {
                //     key: 'companies-register',
                //     label: '청소업체 등록/수정',
                //     icon: null,
                //     onClick: () => navigate('companies/register'),
                // }
            ],
        },

        // 서비스 관리
        {
            key: 'service-management',
            icon: <ProductOutlined />,
            label: '서비스 관리',
            children: [
                {
                    key: 'services-dashboard',
                    label: '대시보드',
                    icon: null,
                    onClick: () => navigate('services/dashboard'),
                },
                {
                    key: 'services-list',
                    label: '서비스 목록',
                    icon: null,
                    onClick: () => navigate('services/list'),
                },
                // {
                //     key: 'services-register',
                //     label: '서비스 등록/수정',
                //     icon: null,
                //     onClick: () => navigate('services/register'),
                // },
            ],
        },

        // 리뷰 관리
        {
            key: 'review-management',
            icon: <StarOutlined />,
            label: '리뷰 관리',
            children: [
                {
                    key: 'reviews-dashboard',
                    label: '대시보드',
                    icon: null,
                    onClick: () => navigate('reviews/dashboard'),
                },
                {
                    key: 'reviews-list',
                    label: '리뷰 목록',
                    icon: null,
                    onClick: () => navigate('reviews/list'),
                },
            ],
        },
    ];

    return (
        <AdminLayout
            menu={menu}
            // headerExceptPath={['auth', 'apply']}
            // footerExceptPath={[]}
            // siderExceptPath={['auth', 'apply']}
            selectedKeys={selectedKeys}
            onSelect={setSelectedKeys}
        >
            <Routes>

                {/* 회원 관리 */}
                <Route path='users'>
                    <Route
                        index
                        path='dashboard'
                        element={
                            <UserDashboard />
                        }
                    />
                    <Route
                        index
                        path='list'
                        element={
                            <UserList />
                        }
                    />
                </Route>

                {/* 청소업체 관리 */}
                <Route path='companies'>
                    <Route
                        index
                        path='dashboard'
                        element={
                            <CompanyDashboard />
                        }
                    />
                    <Route
                        index
                        path='list'
                        element={
                            <CompanyList />
                        }
                    />
                </Route>

                {/* 서비스 관리 */}
                <Route path='services'>
                    <Route
                        index
                        path='dashboard'
                        element={
                            <ServiceDashboard />
                        }
                    />
                    <Route
                        index
                        path='list'
                        element={
                            <ServiceList />
                        }
                    />
                </Route>

                {/* 리뷰 관리 */}
                <Route path='reviews'>
                    <Route
                        index
                        path='dashboard'
                        element={
                            <ReviewDashboard />
                        }
                    />
                    <Route
                        index
                        path='list'
                        element={
                            <ReviewList />
                        }
                    />
                </Route>
            </Routes>
        </AdminLayout>
    );
};

export default AdminRoutes;