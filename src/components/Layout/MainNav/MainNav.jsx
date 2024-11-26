import {
    ChatRoomIcon,
    DashBoardIcon,
    EmplayeeManageIcon,
    EstimateIcon,
    ListIcon,
    ProfileIcon,
    RecentIcon,
    ReviewIcon,
    ScheduleManageIcon,
    LogOutIcon,
} from '../../../assets/icons';
import { useCustomContext } from '../../../context/CustomContext';
import { cookie } from '../../../util';


import './MainNav.css';

const MainNav = ({
    page,
}) => {
    const { navigate } = useCustomContext();

    const logOut = () => {
        cookie.remove('id', { path: '/' }, 1000);
        cookie.remove('token', { path: '/' }, 1000);
        // cookie.remove('name', { path: '/' }, 1000);
        // cookie.remove('email', { path: '/' }, 1000);
        // cookie.remove('userType', { path: '/' }, 1000);

        navigate('/');
    }

    return (
        <nav className="nav-container">
            <div className="nav-header title">
                CLEAN KONG
            </div>
            <ul className="main-nav">
                <li
                    className={`${page === '메인 화면' ? 'current-page' : ''}`}
                    onClick={() => { navigate('/main') }}
                >
                    <DashBoardIcon />
                    메인 화면
                </li>
                <li
                    className={`${page === '대화방 관리' ? 'current-page' : ''}`}
                    onClick={() => { navigate('/chatroom') }}
                >
                    <ChatRoomIcon />
                    대화방 관리
                </li>
                <li
                    className={`${page === '리뷰 관리 및 청소 내역' ? 'current-page' : ''}`}
                    onClick={() => { navigate('/review') }}
                >
                    <ReviewIcon />
                    리뷰 관리 및 청소 내역
                </li>
                <li
                    className={`${page === '일정 관리' ? 'current-page' : ''}`}
                    onClick={() => { navigate('/schedule') }}
                >
                    <ScheduleManageIcon />
                    일정 관리
                </li>
                <li
                    className={`${page === '직원 관리' ? 'current-page' : ''}`}
                    onClick={() => { navigate('/employee') }}
                >
                    <EmplayeeManageIcon />
                    직원 관리
                </li>
                <li
                    className={`divide ${page === '업체 정보 관리' ? 'current-page' : ''}`}
                    onClick={() => { navigate('/company') }}
                >
                    <ListIcon />
                    업체 정보 관리
                </li>
                <li
                    className={`${page === '견적서 요청 관리' ? 'current-page' : ''}`}
                    onClick={() => { navigate('/estimate') }}
                >
                    <EstimateIcon />
                    견적서 요청 관리
                </li>
                <li
                    className={`${page === '청소 요청 목록' ? 'current-page' : ''}`}
                    onClick={() => { navigate('/request_clean') }}
                >
                    <ListIcon />
                    청소 요청 목록
                </li>
            </ul>
            <div
                className="nav-footer"
                onClick={logOut}
            >
                <LogOutIcon />
                LogOut
            </div>
        </nav>
    )
}

export default MainNav;